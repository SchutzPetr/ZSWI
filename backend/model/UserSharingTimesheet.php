<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 15.06.18
 * Time: 22:30
 */

include_once(__DIR__ . "/../database/Database.php");

/**
 * Class UserSharingTimesheet
 */
class UserSharingTimesheet
{

    /**
     * @param integer $userId
     * @return array $arrayOfUsersId
     *
     * Komu já sdílím
     */
    public static function findAllSharedWithUserId($userId)
    {
        $query = "SELECT share_to_id FROM user_sharing_timesheet WHERE sharing_user_id = :userId;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":userId", $userId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUsersId = array();

        foreach ($result as $var){
            $arrayOfUsersId []= $var["share_to_id"];
        }
        return $arrayOfUsersId;

    }

    /**
     * @param integer $userId
     * @return array $arrayOfUsersId
     * Kdo sdílí mně.
     */
    public static function findAllSharedWithOthers($userId)
    {
        $query = "SELECT sharing_user_id FROM user_sharing_timesheet WHERE share_to_id = :userId";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":userId", $userId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUsersId = array();

        foreach ($result as $var){
            $arrayOfUsersId []= $var["sharing_user_id"];
        }
        return $arrayOfUsersId;
    }

    /**
     * @param integer $fromUserId
     * @param integer[] $toUserIds
     */
    static function createShare($fromUserId, $toUserIds)
    {

        for($x=0;$x<count($toUserIds);$x++)
        {
            $query = "INSERT INTO user_sharing_timesheet (sharing_user_id, share_to_id) value (:fromUserId, :toUserId) on duplicate key update sharing_user_id = :fromUserId, share_to_id= :toUserId;";
            $preparedQuery = Database::getConnection()->prepare($query);
            $preparedQuery->bindValue(":fromUserId", $fromUserId);
            $preparedQuery->bindValue(":toUserId", $toUserIds[$x]);

            $preparedQuery->execute();
        }

    }

    /**
     * @param integer $fromUserId
     * @param integer $toUserId
     */
    static function deleteShare($fromUserId, $toUserId)
    {
        $query = "DELETE FROM user_sharing_timesheet WHERE sharing_user_id = :fromUserId AND  share_to_id = :toUserId;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":fromUserId", $fromUserId);
        $preparedQuery->bindValue(":toUserId", $toUserId);

        $preparedQuery->execute();
    }

}