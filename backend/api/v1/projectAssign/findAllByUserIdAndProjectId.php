<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 15.06.2018
 * Time: 21:11
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");


include_once(__DIR__ . "/../FatalErrorHandler.php");

include_once(__DIR__ . "/../OptionSkipHandler.php");
include_once(__DIR__ . "/../CheckTokenHandler.php");
include_once(__DIR__ . "/../../../service/ProjectAssignService.php");
include_once(__DIR__ . "/../../../exception/PermissionException.php");

try {
    echo json_encode(ProjectAssignService::findAllByUserIdAndProjectId($_GET['user_id'], $_GET['project_id']));
} catch (PermissionException $permissionException) {
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode($permissionException);
    exit;
} catch (Exception $exception) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Error-Message: ' . $exception->getMessage(), true, 500);
    die(json_encode($exception));
}