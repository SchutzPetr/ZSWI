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
include_once (__DIR__."/AttendanceService.php");
include_once (__DIR__."/../model/UserContract.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class UserContractService extends Service
{

    /**
     * @param $userContract UserContract
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function create($userContract){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_CONTRACT.CREATE")){
            throw new PermissionException();
        }

        UserContract::save($userContract);
    }

    /**
     * @param $userContract UserContract
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function update($userContract){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_CONTRACT.UPDATE")){
            throw new PermissionException();
        }

        UserContract::save($userContract);
    }

    /**
     * @param $userId integer
     * @param $date string
     * @return UserContract
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findValidByDateAndUserId($userId, $date){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_CONTRACT.FIND")){
            throw new PermissionException();
        }

        return UserContract::findValidByDateAndUserId($userId, $date);
    }

    /**
     * @param $jsonUserContract string
     * @return UserContract|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonUserContract){
        $mapper = new JsonMapper();
        $userContract = $mapper->map(json_decode($jsonUserContract), new UserContract());
        return $userContract;
    }
}