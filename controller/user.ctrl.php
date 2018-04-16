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

if(isset($_GET["/user/login"])){
	$obj = json_decode($_GET["/user/login"], false);
	$array = $dbObject->getUserByLogin($obj->login, $obj->password);
	if($array != null){
		$user = new User();
		$user->fill($array);
		$user->setContract($dbObject->getTypeContract($obj));
		$user->setVacationHourByYear($dbObject->getVacationHourInYear($user->getId(), date("Y")));
	}
	echo json_encode($user->getDataUserToJS());
}

if(isset($_GET["/user/project/id"])){
	$obj = json_decode($_GET["/user/project/id"], false);
	$array = $dbObject->getLastProjectsUserById($obj);
	echo json_encode($array);
}

if(isset($_GET["/user/contract/id"])){
	$obj = json_decode($_GET["/user/contract/id"], false);
	echo json_encode($dbObject->getTypeContract($obj));
}


if(isset($_GET["/user/id"])){
	$obj = json_decode($_GET["getUserByID"], false);
	echo json_encode($dbObject->getUserById($obj));
}

if(isset($_GET["/user/update/id"])){
	$obj = json_decode($_GET["/user/update/id"], false);
	$dbObject->updateUser($obj);
}
if(isset($_POST["/timetable/update/id"])){
	$obj = json_decode($_GET["/timetable/update/id"], false);
	$dbObject->updateTimeTable($obj);
}



