<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 23.05.2018
 * Time: 17:32
 */

include_once(__DIR__ . "/../service/ShareService.php");

class Permission
{

    private static $userPermission = array(
        "SIMPLE_USER.FIND",
        "HOLIDAY.FIND",
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
    public static function hasPermission($user, $permission, $id = null)
    {
        if (is_null($user)) {
            return false;
        }
        if ($user->getAuthority() === "USER") {
            if (!is_null($id) && intval($id) === intval($user->getId())) {
                return true;
            }
            if (!is_null($id) && ($permission === "TIME_SHEET.FIND" || $permission === "TIME_SHEET.GENERATE" ||
                    $permission === "USER.FIND" || $permission === "PROJECT_ASSIGN.FIND")) {
                $simple = ShareService::findShareByFromIdAndToId($id, $user->getId());
                if ($simple === null) {
                    return in_array($permission, self::$userPermission);
                } else {
                    return true;
                }
            }

            if (!is_null($id) && intval($id) === intval($user->getId())) {
                return true;
            }
            return in_array($permission, self::$userPermission);
        } else {
            return true;
        }
    }
}