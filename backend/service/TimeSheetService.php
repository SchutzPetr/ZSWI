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
include_once(__DIR__ . "/HolidayService.php");
include_once(__DIR__ . "/AttendanceService.php");
include_once(__DIR__ . "/ProjectAssignService.php");
include_once(__DIR__ . "/../model/DayTimeSheet.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");
include_once(__DIR__ . "/../api/v1/dto/TimeSheet.php");

class TimeSheetService extends Service
{

    /**
     * @param integer $userId
     * @param integer $month
     * @param integer $year
     * @param DayTimeSheet[] $prev
     * @return TimeSheet
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByUserIdAndYearAndMonth($userId, $month, $year, $prev = [])
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.FIND", $userId)) {
            throw new PermissionException();
        }

        $timeSheet = new TimeSheet();
        $timeSheet->setMonth($month);
        $timeSheet->setYear($year);

        $dayTimeSheets = DayTimeSheet::findAllByUserIdAndYearAndMonth($userId, $month, $year);

        if (empty($dayTimeSheets)) {
            if (!empty($prev)) {
                $timeSheet->setDayTimeSheets($prev);
                return $timeSheet;
            }
            try {
                $array = self::generate($userId, $month, $year);
                if (empty($array)) {
                    return $timeSheet;
                }
            } catch (PermissionException $e) {
                return $timeSheet;
            }
            return self::findAllByUserIdAndYearAndMonth($userId, $month, $year, $array);
        }
		$timeSheet->setProjectAssign(ProjectAssignService::findByUserIdAllActiveInMonthAndYear($userId, $month, $year));
        $timeSheet->setDayTimeSheets($dayTimeSheets);

        return $timeSheet;
    }

    /**
     * @param $userId integer
     * @param $month integer
     * @param $year integer
     * @return array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function generate($userId, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE", $userId)) {
            throw new PermissionException();
        }

        $number = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $dayTimeSheets = array();

        $holidays = UserHoliday::findAllByUserIdAndMonthAndYear($userId, $year, $month);

        for ($i = 1; $i <= $number; $i++) {
            $dayTimeSheet = self::generateForDay($userId, $i, $month, $year, $holidays);
            if ($dayTimeSheet !== null) {
                $dayTimeSheets[] = $dayTimeSheet;
            }
        }

        return $dayTimeSheets;
    }

    /**
     * @param $userId integer
     * @param UserHoliday[] $holidays
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function reGenerateForHoliday($userId, $holidays)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE", $userId)) {
            throw new PermissionException();
        }

        $holidaysByYearAndMonth = array();

        foreach ($holidays as $holiday) {
            $time = strtotime($holiday->getDate());

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
     * @throws UnauthorizedException
     */
    private static function generateForDay($userId, $day, $month, $year, $holidays)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE", $userId)) {
            throw new PermissionException();
        }

        $attendance = AttendanceService::findByUserIdAndDate($userId, $day, $month, $year);
        $holiday = array_key_exists(sprintf("%'.02d", $day), $holidays) ? $holidays[sprintf("%'.02d", $day)] : null;

        $publicHoliday = HolidayService::findByYearMonthAndDay($year, $month, $day);

        $dayTimeSheet = DayTimeSheet::findByUserIdAndDate($userId, $day, $month, $year);
        if($dayTimeSheet === null){
            $dayTimeSheet = new DayTimeSheet();
        }
        $dayTimeSheet->setDate(sprintf("%'.04d-%'.02d-%'.02d", $year, $month, $day));
        $dayTimeSheet->setUserId($userId);

        if ($attendance === null || !$attendance->isEnabled() || $publicHoliday !== null) {
            $dayTimeSheet->setFirstPartFrom(null);
            $dayTimeSheet->setFirstPartTo(null);

            $dayTimeSheet->setSecondPartFrom(null);
            $dayTimeSheet->setSecondPartTo(null);

            if($publicHoliday){
                $dayTimeSheet->setDayType("PUBLIC_HOLIDAY");
            }

            DayTimeSheet::save($dayTimeSheet);

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

    /**
     * @param DayTimeSheet $dayTimeSheet
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function update($dayTimeSheet)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.UPDATE")) {
            throw new PermissionException();
        }

        DayTimeSheet::save($dayTimeSheet);
    }

    /**
     * @param $data string
     * @return DayTimeSheet|object
     * @throws JsonMapper_Exception
     */
    public static function jsonDayTimeSheetDecode($data)
    {
        $mapper = new JsonMapper();
        return $mapper->map(json_decode($data), new DayTimeSheet());
    }
}