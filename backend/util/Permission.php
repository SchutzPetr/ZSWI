<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 23.05.2018
 * Time: 17:32
 */

class Permission
{

    /*
     * USER.FIND
     * USER.CREATE
     * USER.UPDATE
     * PROJECT.CREATE
     * PROJECT.UPDATE
     *
     *
     *
     */

    /**
     * @param User $user
     * @param string $permission
     * @return bool
     */
    public static function hasPermission($user, $permission){
        //todo: check permission
        return true; // only for develop
    }
}