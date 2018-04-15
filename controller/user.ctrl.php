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

if(isset($_GET["loginUser"])){
	$obj = json_decode($_GET["loginUser"], false);
	$user = $dbObject->getUserByLogin($obj->login, $obj->password);
	echo json_encode($user->getDataUserToJS());
}

if(isset($_GET["getLastProjects"])){
	$obj = json_decode($_GET["getLastProjects"], false);
	$array = $dbObject->getLastProjectsUserById($obj);
	echo json_encode($array);
}

if(isset($_GET["getContract"])){
	$obj = json_decode($_GET["getContract"], false);
	echo json_encode($dbObject->getTypeContract($obj));
}


if(isset($_GET["getUserByID"])){
	$obj = json_decode($_GET["getUserByID"], false);
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



