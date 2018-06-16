<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 10.06.2018
 * Time: 14:08
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: X-Auth-Token");

include_once (__DIR__."/../FatalErrorHandler.php");
include_once (__DIR__."/../../../service/TimeSheetService.php");

try {
    $timeSheet = TimeSheetService::findAllByUserIdAndYearAndMonth($_GET['userId'], $_GET['month'], $_GET['year']);
    echo json_encode($timeSheet);
} catch (PermissionException $permissionException) {
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode($permissionException);
    exit;
} catch (Exception $exception){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($exception));
}