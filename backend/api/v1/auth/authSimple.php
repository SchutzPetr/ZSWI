<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 15.06.2018
 * Time: 22:03
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: X-Auth-Token");

include_once (__DIR__."/../FatalErrorHandler.php");
include_once (__DIR__."/../../../service/AuthService.php");
include_once (__DIR__."/../../../exception/PermissionException.php");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    die();
}

try {
    echo json_encode(AuthService::simpleLogin($_GET["login"], $_GET["password"]));
} catch (Exception $exception){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($exception));
}