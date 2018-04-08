<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.04.2018
 * Time: 12:23
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

if(isset($_GET["updateShedule"])){
	$obj = json_decode($_GET["updateShedule"], false);
	$dbObject = new MyDB();
	$dbObject->updateUser($obj);
}
if(isset($_POST["generateSheduleForOneUser"])){
	$obj = json_decode($_GET["generateShedule"], false);
	$dbObject = new MyDB();
	$dbObject->updateTimeTable($obj);
}
if(isset($_POST["generateSheduleForAllActiveUser"])){
	$obj = json_decode($_GET["generateShedule"], false);
	$dbObject = new MyDB();
	$dbObject->updateTimeTable($obj);
}
if(isset($_POST["deleteShedule"])){
	$obj = json_decode($_GET["deleteShedule"], false);
	$dbObject = new MyDB();
	$dbObject->updateTimeTable($obj);
}

