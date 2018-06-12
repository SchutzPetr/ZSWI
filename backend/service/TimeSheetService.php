<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */

include_once(__DIR__ . "/../exception/PermissionException.php");
include_once(__DIR__ . "/../util/Permission.php");
include_once(__DIR__ . "/Service.php");
include_once(__DIR__ . "/UserHolidayService.php");
include_once(__DIR__ . "/AttendanceService.php");
include_once(__DIR__ . "/../model/DayTimeSheet.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class TimeSheetService extends Service
{

    /**
     * @param $userId integer
     * @param $month integer
     * @param $year integer
     * @return DayTimeSheet[]
     * @throws PermissionException
     */
    public static function findAllByUserIdAndYearAndMonth($userId, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.FIND")) {
            throw new PermissionException();
        }

        $dayTimeSheets = DayTimeSheet::findAllByUserIdAndYearAndMonth($userId, $month, $year);

        if (empty($dayTimeSheets)) {
            try {
                self::generate($userId, $month, $year);
            } catch (PermissionException $e) {
                return array();
            }
            return self::findAllByUserIdAndYearAndMonth($userId, $month, $year);
        }

        return $dayTimeSheets;
    }

    /**
     * @param $userId integer
     * @param $month integer
     * @param $year integer
     * @return array
     * @throws PermissionException
     */
    public static function generate($userId, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE")) {
            throw new PermissionException();
        }

        $number = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $dayTimeSheets = array();

        for ($i = 1; $i <= $number; $i++) {
            $dayTimeSheet = self::generateForDay($userId, $i, $month, $year);
            if ($dayTimeSheet === null) {
                $dayTimeSheets[] = $dayTimeSheet;
            }
        }

        return $dayTimeSheets;
    }

    /**
     * @param $userId integer
     * @param UserHoliday[] $holidays
     * @throws PermissionException
     */
    public static function reGenerateForHoliday($userId, $holidays)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE")) {
            throw new PermissionException();
        }

        $holidaysByYearAndMonth = array();

        foreach ($holidays as $holiday) {
            $time = strtotime($holiday->getDay());

            $year = date('Y', $time);
            $month = date('m', $time);
            $day = date('d', $time);

            $array = array_key_exists($year . "-" . $month, $holidaysByYearAndMonth) ?
                $holidaysByYearAndMonth[$year . "-" . $month] : array();

            $array[$day] = $holiday;

            $holidaysByYearAndMonth[$year . "-" . $month] = $array;
        }

        foreach ($holidaysByYearAndMonth as $key => $holidays) {
            $time = strtotime($key);

            $year = date('Y', $time);
            $month = date('m', $time);

            $number = cal_days_in_month(CAL_GREGORIAN, $month, $year);


            for ($i = 1; $i <= $number; $i++) {
                self::generateForDay($userId, $i, $month, $year, $holidays);
            }
        }
    }

    /**
     * @param $userId integer
     * @param $day integer
     * @param $month integer
     * @param $year integer
     * @param $holidays UserHoliday[]
     * @return DayTimeSheet
     * @throws PermissionException
     */
    private static function generateForDay($userId, $day, $month, $year, $holidays)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE")) {
            throw new PermissionException();
        }

        $attendance = AttendanceService::findByUserIdAndDate($userId, $day, $month, $year);
        $holiday = array_key_exists(sprintf("%'.02d", $day), $holidays) ? $holidays[sprintf("%'.02d", $day)] : null;

        $dayTimeSheet = new DayTimeSheet();
        $dayTimeSheet->setDate(sprintf("%'.04d-%'.02d-%'.02d", $year, $month, $day));
        $dayTimeSheet->setUserId($userId);

        if($attendance === null){
            $dayTimeSheet->setFirstPartFrom(null);
            $dayTimeSheet->setFirstPartTo(null);

            $dayTimeSheet->setSecondPartFrom(null);
            $dayTimeSheet->setSecondPartTo(null);

            return $dayTimeSheet;
        }

        if ($holiday !== null) {

            switch ($holiday->getType()) {
                case "ALL_DAY":
                    $dayTimeSheet->setFirstPartFrom(null);
                    $dayTimeSheet->setFirstPartTo(null);

                    $dayTimeSheet->setSecondPartFrom(null);
                    $dayTimeSheet->setSecondPartTo(null);

                    $dayTimeSheet->setDayType("HOLIDAY_ALL_DAY");
                    break;
                case "FIRST_PART_OF_DAY":
                    $dayTimeSheet->setFirstPartFrom(null);
                    $dayTimeSheet->setFirstPartTo(null);

                    $dayTimeSheet->setSecondPartFrom($attendance->getSecondPartFrom());
                    $dayTimeSheet->setSecondPartTo($attendance->getSecondPartTo());

                    $dayTimeSheet->setDayType("HOLIDAY_FIRST_PART_OF_DAY");
                    break;
                case "SECOND_PART_OF_DAY":
                    $dayTimeSheet->setSecondPartFrom(null);
                    $dayTimeSheet->setSecondPartTo(null);

                    $dayTimeSheet->setFirstPartFrom($attendance->getFirstPartFrom());
                    $dayTimeSheet->setFirstPartTo($attendance->getFirstPartTo());

                    $dayTimeSheet->setDayType("HOLIDAY_SECOND_PART_OF_DAY");
                    break;
            }
        } else {
            $dayTimeSheet->setFirstPartFrom($attendance->getFirstPartFrom());
            $dayTimeSheet->setFirstPartTo($attendance->getFirstPartTo());

            $dayTimeSheet->setSecondPartFrom($attendance->getSecondPartFrom());
            $dayTimeSheet->setSecondPartTo($attendance->getSecondPartTo());
        }

        DayTimeSheet::save($dayTimeSheet);

        return $dayTimeSheet;
    }
}