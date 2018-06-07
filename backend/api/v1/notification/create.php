<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.06.2018
 * Time: 21:02
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once (__DIR__."/../FatalErrorHandler.php");
include_once (__DIR__."/../../../service/NotificationService.php" );
include_once (__DIR__."/../../../exception/PermissionException.php");

$data = file_get_contents('php://input');

if((!isset($data) || trim($data)==='')){
	die;
}
if(substr( $data, 0, 1 ) === "\"" &&  substr($data, strlen("\"")*-1) == "\""){
	$data = json_decode($data);
}
try {
	$notification = NotificationService::jsonNotificationDecode($data);
	UserHolidayService::create($notification);
} catch (PermissionException $permissionException) {
	header("HTTP/1.1 401 Unauthorized");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode($permissionException));
} catch (Exception $exception){
	header('HTTP/1.1 500 Internal Server Error');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode($exception));
}