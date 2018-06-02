<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */

include_once (__DIR__."../exception/PermissionException.php");
include_once (__DIR__."../util/Permission.php");
include_once (__DIR__."Service.php");
include_once (__DIR__."../model/Project.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class ProjectService extends Service
{
    /**
     * @param $id integer
     * @return Project
     * @throws PermissionException
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
}