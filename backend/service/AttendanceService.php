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
include_once(__DIR__ . "/TimeSheetService.php");
include_once(__DIR__ . "/../model/Attendance.php");
include_once(__DIR__ . "./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class AttendanceService extends Service
{

    /**
     * @param $userId integer
     * @return Attendance[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findLastByUserId($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND", $userId)) {
            throw new PermissionException();
        }

        return Attendance::findLastByUserId($userId);
    }

    /**
     * @param $userId integer
     * @return Attendance[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByUserId($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND", $userId)) {
            throw new PermissionException();
        }

        return Attendance::findAllByUserId($userId);
    }

    /**
     * @param $userId integer
     * @param $day integer
     * @param $month integer
     * @param $year integer
     * @return Attendance
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findByUserIdAndDate($userId, $day, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND", $userId)) {
            throw new PermissionException();
        }

        return Attendance::findByUserIdAndDate($userId, $day, $month, $year);
    }

    /**
     * @param $id integer
     * @return Attendance
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findById($id)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")) {
            throw new PermissionException();
        }

        return Attendance::findById($id);
    }

    /**
     * @return Attendance[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAll()
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")) {
            throw new PermissionException();
        }

        return Attendance::findAll();
    }

    /**
     * @param $attendance Attendance[]|Attendance
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function create($attendance)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.CREATE")) {
            throw new PermissionException();
        }

        if (is_array($attendance)) {
            foreach ($attendance as $item) {
                Attendance::save($item);
            }
        } else {
            Attendance::save($attendance);
        }
    }

    /**
     * @param $attendance Attendance[]|Attendance
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function update($attendance)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.CREATE")) {
            throw new PermissionException();
        }


        if (is_array($attendance)) {
            $min = $attendance[1];
            foreach ($attendance as $item) {
                if (strtotime($min->getActiveFrom() > strftime($item->getActiveFrom()))) {
                    $min = $item;
                }
                Attendance::save($item);
            }
        } else {
            $min = $attendance;
            Attendance::save($attendance);
        }

        $time = strtotime($min->getActiveFrom());

        $year = date('Y', $time);

        for ($i = $year; $i <= date('Y'); $i++) {
            for ($j = 1; $j < 13; $j++) {
                if (date('Y') === $i && date('m') === $j) {
                    return;
                }
                TimeSheetService::generate($min->getUserId(), $j, $i);
            }
        }
    }

    /**
     * @param $jsonAttendance string
     * @return Attendance|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonAttendance)
    {
        $mapper = new JsonMapper();
        $attendance = $mapper->map(json_decode($jsonAttendance), new Attendance());
        return $attendance;
    }
}