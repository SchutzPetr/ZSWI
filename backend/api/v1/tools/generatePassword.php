<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 16.06.2018
 * Time: 9:08
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");


include_once(__DIR__ . "/../FatalErrorHandler.php");
include_once(__DIR__ . "/../OptionSkipHandler.php");

try {
    echo password_hash($_GET['password'], PASSWORD_BCRYPT);
} catch (Exception $exception) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Error-Message: ' . $exception->getMessage(), true, 500);
    die(json_encode($exception));
}