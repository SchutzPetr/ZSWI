<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */

include_once ('./../exception/PermissionException.php');
include_once ('Service.php');

include_once ('./../model/User.php');


class UserService extends Service
{

    /**
     * @param integer $id
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
     * @param User $user
     * @throws PermissionException
     */
    public static function create($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.CREATE")){
            throw new PermissionException();
        }

        User::save($user);
    }

    /**
     * @param User $user
     * @throws PermissionException
     */
    public static function update($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.UPDATE")){
            throw new PermissionException();
        }

        User::save($user);
    }
}