<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 23.05.2018
 * Time: 17:32
 */

class Permission
{

    private static $userPermission = array(
        "SIMPLE_USER",
    );

    /*
     * USER.FIND
     * USER.CREATE
     * USER.UPDATE
     * PROJECT.FIND
     * PROJECT.UPDATE
     * PROJECT.CREATE
     *
     */

    /**
     * @param User $user
     * @param string $permission
     * @param integer $id
     * @return bool
     */
    public static function hasPermission($user, $permission, $id = null){
        if(is_null($user)){
            return false;
        }
        if($user->getAuthority() === "USER"){
            if(!is_null($id) && intval($id) === intval($user->getId())){
                return true;
            }
            return array_search($permission,  self::$userPermission);
        }else{
            return true;
        }
    }
}