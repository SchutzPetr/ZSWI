<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:25
 */

include_once ('./../model/User.php');

abstract class Service
{
    /**
     * @return User
     */
    public static function getUserFromContext(){
        return new User();
    }
}