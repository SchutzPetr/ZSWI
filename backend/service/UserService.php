<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:13
 */


include_once (__DIR__."/../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/AttendanceService.php");
include_once (__DIR__."/UserContractService.php");
include_once (__DIR__."/../model/User.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class UserService extends Service
{
    /**
     * @param $id integer
     * @return User
     * @throws PermissionException
     */
    public static function findById($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.FIND")){
            throw new PermissionException();
        }

        return User::findById($id);
    }

    /**
     * @param $id integer
     * @return array
     * @throws PermissionException
     */
    public static function findByProjectId($id){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.FIND")){
            throw new PermissionException();
        }

        return User::findByProjectId($id);
    }

    /**
     * @return User[]
     * @throws PermissionException
     */
    public static function findAll(){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.FIND")){
            throw new PermissionException();
        }

        return User::findAll();
    }

    /**
     * @param $user User
     * @throws PermissionException
     */
    public static function create($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.CREATE")){
            throw new PermissionException();
        }

        $createdUser = User::save($user);
        foreach ($user->getAttendanceSchedules() as $var) {
            $var->setUserId($createdUser->getId());
        }
        AttendanceService::create($user->getAttendanceSchedules());
        $user->getCurrentUserContract()->setUserId($createdUser->getId());
        UserContractService::create($user->getCurrentUserContract());
    }

    /**
     * @param $user User
     * @throws PermissionException
     */
    public static function update($user){
        if(!Permission::hasPermission(self::getUserFromContext(), "USER.UPDATE")){
            throw new PermissionException();
        }

        $updatedUser = User::save($user);
        foreach ($user->getAttendanceSchedules() as $var) {
            $var->setUserId($updatedUser->getId());
        }
        AttendanceService::update($user->getAttendanceSchedules());
        if($user->getCurrentUserContract()->getUserId() === -1){
            $user->getCurrentUserContract()->setUserId($updatedUser->getId());
            UserContractService::create($user->getCurrentUserContract());
        }else{
            UserContractService::update($user->getCurrentUserContract());
        }
        foreach ($user->getFutureUserContract() as $contract) {
            UserContractService::update($contract);
        }

    }

    /**
     * @param $jsonUser string
     * @return User|object
     * @throws JsonMapper_Exception
     */
    public static function jsonUserDecode($jsonUser){
        $mapper = new JsonMapper();
        $user = $mapper->map(json_decode($jsonUser), new User());
        return $user;
    }
}