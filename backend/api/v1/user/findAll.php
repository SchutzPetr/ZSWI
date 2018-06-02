<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 02.06.2018
 * Time: 0:17
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once (__DIR__."/../../../service/UserService.php");
include_once (__DIR__."/../../../exception/PermissionException.php");

try {
    echo json_encode(UserService::findAll());
} catch (PermissionException $permissionException) {
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode($permissionException);
    exit;
} catch (Exception $exception){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($exception));
}