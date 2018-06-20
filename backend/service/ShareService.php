<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 14.06.2018
 * Time: 19:14
 */
include_once(__DIR__ . "/../exception/PermissionException.php");
include_once(__DIR__ . "/../util/Permission.php");
include_once(__DIR__ . "/../util/Utils.php");
include_once(__DIR__ . "/Service.php");
include_once(__DIR__ . "/../model/UserSharingTimesheet.php");
include_once(__DIR__ . "./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");


class ShareService extends Service
{
    /**
     * @param integer $userId
     * @return SimpleUser[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllSharedWithUserId($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.FIND", $userId)) {
            throw new PermissionException();
        }

        return UserSharingTimesheet::findAllSharedWithUserId($userId);

    }

    /**
     * @param integer $userId
     * @return SimpleUser[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllSharedWithOthers($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.FIND", $userId)) {
            throw new PermissionException();
        }

        return UserSharingTimesheet::findAllSharedWithOthers($userId);
    }

    /**
     * @param integer $userId
     * @return SimpleUser[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllAvailableUsers($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.FIND", $userId)) {
            throw new PermissionException();
        }

        return UserSharingTimesheet::findAllAvailableUsers($userId);
    }

    /**
     * @param integer $fromUserId
     * @param integer $toUserId
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function createShare($fromUserId, $toUserId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.CREATE", $fromUserId)) {
            throw new PermissionException();
        }

        UserSharingTimesheet::save($fromUserId, $toUserId);
    }

    /**
     * @param integer $fromUserId
     * @param integer $toUserId
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function delete($fromUserId, $toUserId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.DELETE", $fromUserId)) {
            throw new PermissionException();
        }

        UserSharingTimesheet::delete($fromUserId, $toUserId);
    }

    /**
     * @param integer $fromUserId
     * @param integer $toUserId
     * @return SimpleUser
     */
    public static function findShareByFromIdAndToId($fromUserId, $toUserId)
    {
        /*if(!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING.DELETE", $fromUserId)){
            throw new PermissionException();
        }*///Není potřeba ->m pouze vnitřní funkce

        return UserSharingTimesheet::findShareByFromIdAndToId($fromUserId, $toUserId);
    }
}