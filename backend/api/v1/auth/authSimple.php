<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 15.06.2018
 * Time: 22:03
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once(__DIR__ . "/../FatalErrorHandler.php");
include_once(__DIR__ . "/../OptionSkipHandler.php");
include_once(__DIR__ . "/../../../service/AuthService.php");
include_once(__DIR__ . "/../../../exception/PermissionException.php");

try {
    $object = new stdClass();
    $object->token = AuthService::simpleLogin($_GET["login"], $_GET["password"]);
    echo json_encode($object);
} catch (Exception $exception) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Error-Message: ' . $exception->getMessage(), true, 500);
    die(json_encode($exception));
}