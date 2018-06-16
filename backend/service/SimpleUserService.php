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
include_once (__DIR__."/UserContractService.php");
include_once (__DIR__."/../model/SimpleUser.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class SimpleUserService extends Service
{
    /**
     * @param $id integer
     * @return SimpleUser
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findById($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "SIMPLE_USER.FIND")){
            throw new PermissionException();
        }

        return SimpleUser::findById($id);
    }

    /**
     * @param string $login
     * @return SimpleUser
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findByLogin($login){
        if(!Permission::hasPermission(self::getUserFromContext(), "SIMPLE_USER.FIND")){
            throw new PermissionException();
        }

        return SimpleUser::findByOrion($login);
    }

    /**
     * @param $id integer
     * @return array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findByProjectId($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "SIMPLE_USER.FIND")){
            throw new PermissionException();
        }

        return SimpleUser::findByProjectId($id);
    }

    /**
     * @return SimpleUser[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAll(){
        if(!Permission::hasPermission(self::getUserFromContext(), "SIMPLE_USER.FIND")){
            throw new PermissionException();
        }

        return SimpleUser::findAll();
    }

    /**
     * @param $jsonUser string
     * @return SimpleUser|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonUser){
        $mapper = new JsonMapper();
        $user = $mapper->map(json_decode($jsonUser), new SimpleUser());
        return $user;
    }
}