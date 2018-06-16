<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 09.06.2018
 * Time: 9:22
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");


include_once (__DIR__."/../FatalErrorHandler.php");
include_once ( __DIR__ . "/../../../service/UserHolidayService.php" );
include_once (__DIR__."/../../../exception/PermissionException.php");

try {
	UserHolidayService::deleteById($_GET['id']);
} catch (PermissionException $permissionException) {
	header("HTTP/1.1 401 Unauthorized");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode($permissionException));
} catch (Exception $exception){
	header('HTTP/1.1 500 Internal Server Error');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode($exception));
}