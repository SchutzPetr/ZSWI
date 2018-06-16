<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 0:04
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: X-Auth-Token");

include_once (__DIR__."/../FatalErrorHandler.php");
include_once (__DIR__."/../../../service/ProjectService.php");
include_once (__DIR__."/../../../exception/PermissionException.php");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    die();
}

$data = file_get_contents('php://input');

if((!isset($data) || trim($data)==='')){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(new Exception("EMPTY_DATA")));
}
if(substr( $data, 0, 1 ) === "\"" &&  substr($data, strlen("\"")*-1) == "\""){
    $data = json_decode($data);
}
try {
    $project = ProjectService::jsonProjectDecode($data);
    ProjectService::create($project);
} catch (PermissionException $permissionException) {
    header("HTTP/1.1 401 Unauthorized");
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($permissionException));
} catch (Exception $exception){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($exception));
}