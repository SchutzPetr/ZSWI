<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 15.06.2018
 * Time: 21:15
 */

include_once(__DIR__ . "/../exception/PermissionException.php");
include_once(__DIR__ . "/../util/Permission.php");
include_once(__DIR__ . "/../util/Utils.php");
include_once(__DIR__ . "/Service.php");
include_once(__DIR__ . "/../model/Project.php");
include_once(__DIR__ . "/../model/ProjectAssign.php");
include_once(__DIR__ . "./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class ProjectAssignService extends Service
{

    /**
     * @param ProjectAssign $projectAssign
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function create($projectAssign)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.CREATE")) {
            throw new PermissionException();
        }

        ProjectAssign::save($projectAssign);
    }

    /**
     * @param ProjectAssign $projectAssign
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function update($projectAssign)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.UPDATE")) {
            throw new PermissionException();
        }

        ProjectAssign::save($projectAssign);
    }

    /***
     * @param int $userId
     * @return ProjectAssign [] array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByUserId($userId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.FIND", $userId)) {
            throw new PermissionException();
        }

        return ProjectAssign::findAllByUserId($userId);
    }

    /***
     * @param int $projectId
     * @return ProjectAssign [] array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByProjectId($projectId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.FIND")) {
            throw new PermissionException();
        }

        return ProjectAssign::findAllByProjectId($projectId);
    }


    /***
     * @param int $userId
     * @param int $year
     * @return ProjectAssign [] array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByUserIdAndYear($userId, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.FIND", $userId)) {
            throw new PermissionException();
        }

        return ProjectAssign::findAllByUserIdAndYear($userId, $year);
    }

    /***
     * @param int $userId
     * @param int $month
     * @param int $year
     *
     * @return ProjectAssign[] array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findByUserIdAllActiveInMonthAndYear($userId, $month, $year)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.FIND", $userId)) {
            throw new PermissionException();
        }

        return ProjectAssign::findByUserIdAllActiveInMonthAndYear($userId, $month, $year);
    }

    /***
     * @param int $userId
     * @param int $projectId
     *
     * @return ProjectAssign[] array
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAllByUserIdAndProjectId($userId, $projectId)
    {
        if (!Permission::hasPermission(self::getUserFromContext(), "PROJECT_ASSIGN.FIND")) {
            throw new PermissionException();
        }

        return ProjectAssign::findAllByUserIdAndProjectId($userId, $projectId);
    }

    /**
     * @param $jsonProject string
     * @return ProjectAssign|object
     * @throws JsonMapper_Exception
     */
    public static function jsonProjectAssignDecode($jsonProject)
    {
        $mapper = new JsonMapper();
        return $mapper->map(json_decode($jsonProject), new ProjectAssign());
    }
}
