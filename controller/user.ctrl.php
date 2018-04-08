<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 03.04.2018
 * Time: 18:32
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

if(isset($_GET["updateUser"])){
	$obj = json_decode($_GET["updateUser"], false);
	$dbObject = new MyDB();
	$dbObject->updateUser($obj);
}
if(isset($_POST["updateTimeTable"])){
	$obj = json_decode($_GET["updateTimeTable"], false);
	$dbObject = new MyDB();
	$dbObject->updateTimeTable($obj);
}



