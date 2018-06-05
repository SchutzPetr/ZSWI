<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */


include_once (__DIR__."/../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/../model/Attendance.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class AttendanceService extends Service
{

    /**
     * @param $userId integer
     * @return Attendance
     * @throws PermissionException
     */
    public static function findLastByUserId($userId){
        if(!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")){
            throw new PermissionException();
        }

        return Attendance::findLastByUserId($userId);
    }

    /**
     * @param $userId integer
     * @return Attendance[]
     * @throws PermissionException
     */
    public static function findAllByUserId($userId){
        if(!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")){
            throw new PermissionException();
        }

        return Attendance::findAllByUserId($userId);
    }

    /**
     * @param $id integer
     * @return Attendance
     * @throws PermissionException
     */
    public static function findById($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")){
            throw new PermissionException();
        }

        return Attendance::findById($id);
    }

    /**
     * @return Attendance[]
     * @throws PermissionException
     */
    public static function findAll(){
        if(!Permission::hasPermission(self::getUserFromContext(), "ATTENDANCE.FIND")){
            throw new PermissionException();
        }

        return Attendance::findAll();
    }

    /**
     * @param $attendance Attendance
     * @throws PermissionException
     */
    public static function create($attendance){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.CREATE")){
            throw new PermissionException();
        }

        Attendance::save($attendance);
    }

    /**
     * @param $jsonAttendance string
     * @return Attendance|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonAttendance){
        $mapper = new JsonMapper();
        $attendance = $mapper->map(json_decode($jsonAttendance), new Attendance());
        return $attendance;
    }
}