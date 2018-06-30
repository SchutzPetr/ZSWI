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
include_once(__DIR__ . "/../../../exception/UnauthorizedException.php");


try {
    if(array_key_exists("WEBAUTH_USER", $_SERVER)){
        $orion_login = $_SERVER["WEBAUTH_USER"];
        $orion_login = trim($orion_login);

        $object = new stdClass();
        $object->token = AuthService::orionLogin($orion_login);
        echo json_encode($object);
    }else{
        throw new UnauthorizedException();
    }
} catch (UnauthorizedException $unauthorizedException) {
    header("HTTP/1.1 401 Unauthorized");
    die("HTTP/1.1 401 Unauthorized");
} catch (Exception $exception) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Error-Message: ' . $exception->getMessage(), true, 500);
    die(json_encode($exception));
}