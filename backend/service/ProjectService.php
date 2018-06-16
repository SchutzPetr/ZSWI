<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */

include_once (__DIR__."/../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/../util/Utils.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/UserContractService.php");
include_once (__DIR__."/../model/Project.php");
include_once (__DIR__ . "/../model/ProjectAssign.php");
include_once (__DIR__ . "/../model/UserContract.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class ProjectService extends Service
{
    /**
     * @param $id integer
     * @return Project
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findById($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.FIND")){
            throw new PermissionException();
        }

        return Project::findById($id);
    }

    /**
     * @return Project[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function findAll(){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.FIND")){
            throw new PermissionException();
        }

        return Project::findAll();
    }

    /**
     * @param Project $project
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function create($project){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.CREATE")){
            throw new PermissionException();
        }

        Project::save($project);
    }

    /**
     * @param Project $project
     * @throws PermissionException
     * @throws UnauthorizedException
     */
    public static function update($project){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.UPDATE")){
            throw new PermissionException();
        }

        Project::save($project);
    }

    /**
     * @param $projectAssign ProjectAssign
     * @throws PermissionException
     * @throws Exception
     */
    public static function assignUsers($projectAssign){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.ASSIGN")){
            throw new PermissionException();
        }
        $userContract = UserContractService::findValidByDateAndUserId($projectAssign->getUserId(), $projectAssign->getActiveFrom());

        if($userContract->getActiveTo() === null){
            $isBetween = true;
        }else {
            if($projectAssign->getActiveTo() === null){
                $projectAssign->setActiveTo($userContract->getActiveTo());
            }
            $isBetween = Utils::isBetweenDate($projectAssign->getActiveFrom(), $projectAssign->getActiveTo(),
                $userContract->getActiveFrom(), $userContract->getActiveTo());
        }
        if(!$isBetween){
            throw new Exception("Project assign date is not between date of contract");
        }

        $newUserContract = new UserContract();
        $newUserContract->setUserId($userContract->getUserId());
        $newUserContract->setActiveTo($userContract->getActiveTo());
        $newUserContract->setActiveFrom($projectAssign->getActiveFrom());
        $newUserContract->setObligationKIV($userContract->getObligationKIV());
        $newUserContract->setObligationNTIS($userContract->getObligationNTIS());

    }

    /**
     * @param $jsonProject string
     * @return Project|object
     * @throws JsonMapper_Exception
     */
    public static function jsonProjectDecode($jsonProject){
        $mapper = new JsonMapper();
        $project = $mapper->map(json_decode($jsonProject), new Project());
        return $project;
    }

    /**
     * @param $jsonProject string
     * @return ProjectAssign|object
     * @throws JsonMapper_Exception
     */
    public static function jsonProjectAssignDecode($jsonProject){
        $mapper = new JsonMapper();
        return $mapper->map(json_decode($jsonProject), new ProjectAssign());
    }
}