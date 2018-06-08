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
    public static function findByUserIdAndYearAndMonth($userId, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.FIND")) {
            throw new PermissionException();
        }

        $dayTimeSheets = DayTimeSheet::findAllByUserIdAndYearAndMonth($userId, $month, $year);

        if(empty($dayTimeSheets)){
            try {
                self::generate($userId, $month, $year);
            } catch (PermissionException $e) {
                return array();
            }
            return self::findByUserIdAndYearAndMonth($userId, $month, $year);
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
     * @param $day integer
     * @param $month integer
     * @param $year integer
     * @return DayTimeSheet
     * @throws PermissionException
     */
    private static function generateForDay($userId, $day, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "TIME_SHEET.GENERATE")) {
            throw new PermissionException();
        }

        $attendance = AttendanceService::findByUserIdAndDate($userId, $day, $month, $year);

        $dayTimeSheet = new DayTimeSheet();

        $dayTimeSheet->setDate(sprintf("%'.04d-%'.02d-%'.02d", $year, $month, $day));
        $dayTimeSheet->setUserId($userId);

        $dayTimeSheet->setFirstPartFrom($attendance->getFirstPartFrom());
        $dayTimeSheet->setFirstPartTo($attendance->getFirstPartTo());

        $dayTimeSheet->setSecondPartFrom($attendance->getSecondPartFrom());
        $dayTimeSheet->setSecondPartTo($attendance->getSecondPartTo());

        DayTimeSheet::save($dayTimeSheet);

        return $dayTimeSheet;
    }
}