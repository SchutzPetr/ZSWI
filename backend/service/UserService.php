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
include_once (__DIR__."/../model/User.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class UserService extends Service
{
    /**
     * @param $id integer
     * @return User
     * @throws PermissionException
     */
    public static function findById($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.FIND")){
            throw new PermissionException();
        }

        return User::findById($id);
    }

    /**
     * @return User[]
     * @throws PermissionException
     */
    public static function findAll(){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.FIND")){
            throw new PermissionException();
        }

        return User::findAll();
    }

    /**
     * @param $user User
     * @throws PermissionException
     */
    public static function create($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.CREATE")){
            throw new PermissionException();
        }

        User::save($user);
    }

    /**
     * @param $user User
     * @throws PermissionException
     */
    public static function update($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.UPDATE")){
            throw new PermissionException();
        }

        User::save($user);
    }

    /**
     * @param $jsonUser string
     * @return User|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonUser){
        $mapper = new JsonMapper();
        $user = $mapper->map(json_decode($jsonUser), new User());
        return $user;
    }
}