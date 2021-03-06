<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:04
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include_once(__DIR__ . "/../FatalErrorHandler.php");

include_once(__DIR__ . "/../OptionSkipHandler.php");
include_once(__DIR__ . "/../CheckTokenHandler.php");
include_once(__DIR__ . "/../../../service/UserService.php");
include_once(__DIR__ . "/../../../exception/PermissionException.php");


$data = file_get_contents('php://input');

if ((!isset($data) || trim($data) === '')) {
    die;
}
if (substr($data, 0, 1) === "\"" && substr($data, strlen("\"") * -1) == "\"") {
    $data = json_decode($data);
}
try {
    $user = UserService::jsonUserDecode($data);
    UserService::delete($user);
} catch (PermissionException $permissionException) {
    header("HTTP/1.1 401 Unauthorized");
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($permissionException));
} catch (Exception $exception) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Error-Message: ' . $exception->getMessage(), true, 500);
    die(json_encode($exception));
}