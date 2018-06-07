<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.06.2018
 * Time: 20:55
 */
include_once (__DIR__."../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/../model/Notification.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");

class NotificationService extends Service
{


	/**
	 * @param $id integer
	 * @return Notification
	 * @throws PermissionException
	 */
	public static function findById($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "NOTIFICATION.FIND")){
			throw new PermissionException();
		}

		return Notification::findById($id);
	}

	/**
	 * @return Notification[]
	 * @throws PermissionException
	 */
	public static function findAll(){
		if(!Permission::hasPermission(self::getUserFromContext(), "NOTIFICATION.FIND")){
			throw new PermissionException();
		}

		return Notification::findAll();
	}

	/**
	 * @return Notification[]
	 * @throws PermissionException
	 */
	public static function findAllUnread(){
		if(!Permission::hasPermission(self::getUserFromContext(), "NOTIFICATION.FIND")){
			throw new PermissionException();
		}

		return Notification::findAllUnread();
	}

	/**
	 * @param Notification $notification
	 * @throws PermissionException
	 */
	public static function create($notification){
		if(!Permission::hasPermission(self::getUserFromContext(), "NOTIFICATION.CREATE")){
			throw new PermissionException();
		}

		Notification::save($notification);
	}

	/**
	 * @param Notification $notification
	 * @throws PermissionException
	 */
	public static function update($notification){
		if(!Permission::hasPermission(self::getUserFromContext(), "NOTIFICATION.UPDATE")){
			throw new PermissionException();
		}

		Notification::save($notification);
	}

	/**
	 * @param $jsonNotification string
	 * @return Notification|object
	 * @throws JsonMapper_Exception
	 */
	public static function jsonNotificationDecode($jsonNotification){
		$mapper = new JsonMapper();
		$notification = $mapper->map(json_decode($jsonNotification), new Notification());
		return $notification;
	}



}