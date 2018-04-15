<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 03.04.2018
 * Time: 18:32
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
$dbObject = new DataBase();

if(isset($_GET["getUserByID"])){
	$obj = json_decode($_GET["updateUser"], false);
	echo json_encode($dbObject->getUserById($obj));
}

if(isset($_GET["updateUser"])){
	$obj = json_decode($_GET["updateUser"], false);
	$dbObject->updateUser($obj);
}
if(isset($_POST["updateTimeTable"])){
	$obj = json_decode($_GET["updateTimeTable"], false);
	$dbObject->updateTimeTable($obj);
}



