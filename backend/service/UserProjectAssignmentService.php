<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */

include_once (__DIR__."../exception/PermissionException.php");
include_once (__DIR__."../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."../model/Project.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class UserProjectAssignmentService extends Service
{

    /**
     * @param Project $project
     * @throws PermissionException
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
     */
    public static function update($project){
        if(!Permission::hasPermission(self::getUserFromContext(), "PROJECT.UPDATE")){
            throw new PermissionException();
        }

        Project::save($project);
    }
}