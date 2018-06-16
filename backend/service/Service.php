<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:25
 */

include_once(__DIR__ . "/../model/User.php");
include_once(__DIR__ . "/AuthService.php");

abstract class Service
{
    /**
     * @return User
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function getUserFromContext()
    {
        return AuthService::findUserByToken(self::getTokenFromHeader());
    }

    /**
     * @return string|null
     */
    public static function getTokenFromHeader()
    {
        return $_SERVER["HTTP_X_AUTH_TOKEN"];
    }
}