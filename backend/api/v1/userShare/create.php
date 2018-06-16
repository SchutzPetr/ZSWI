<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 16.06.2018
 * Time: 9:07
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");


include_once (__DIR__."/../FatalErrorHandler.php");
include_once (__DIR__."/../../../service/ShareService.php");
include_once (__DIR__."/../../../exception/PermissionException.php");


if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    die();
}

$data = file_get_contents('php://input');

if((!isset($data) || trim($data)==='')){
    die;
}
if(substr( $data, 0, 1 ) === "\"" &&  substr($data, strlen("\"")*-1) == "\""){
    $data = json_decode($data);
}

try {
    $shareOptions = json_decode($data);
	ShareService::createShare($shareOptions->from, $shareOptions->to);
} catch (PermissionException $permissionException) {
	header("HTTP/1.1 401 Unauthorized");
	echo json_encode($permissionException);
	exit;
} catch (Exception $exception){
	header('HTTP/1.1 500 Internal Server Error');
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode($exception));
}