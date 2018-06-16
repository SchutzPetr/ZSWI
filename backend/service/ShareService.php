<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 14.06.2018
 * Time: 19:14
 */

class ShareService
{
    /**
     * @param integer $userId
     * @return UserSharingTimesheet
     * @throws PermissionException
     */
    public static function findAllSharedWithUserId($userId)
    {
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING_TIMESHEET.FIND")){
            throw new PermissionException();
        }

        return UserSharingTimesheet::findAllSharedWithUserId($userId);

    }

    /**
     * @param integer $userId
     */
    public static function findAllSharedWithOthers($userId)
    {

    }

    /**
     * @param integer $userId
     */
    public static function findAllAvailableUsers($userId)
    {

    }

    /**
     * @param integer $fromUserId
     * @param integer[] $toUserIds
     * @throws PermissionException
     */
    public static function createShare($fromUserId, $toUserIds){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING_TIMESHEET.CREATE")){
            throw new PermissionException();
        }

        return UserSharingTimesheet::createShare($fromUserId, $toUserIds);
    }

    /**
     * @param integer $fromUserId
     * @param integer $toUserId
     * @throws PermissionException
     */
    public static function deleteShare($fromUserId, $toUserId){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER_SHARING_TIMESHEET.DELETE")){
            throw new PermissionException();
        }

        return UserSharingTimesheet::deleteShare($fromUserId, $toUserId);
    }
}