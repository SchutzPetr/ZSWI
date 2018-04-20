<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 20.04.2018
 * Time: 14:54
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

$dbObject = new DataBase();

if(isset($_GET["/timetable/update/id"])){
	$obj = json_decode($_GET["/timetable/update/id"], false);
	$dbObject->updateTimeTable($obj);
}else if(isset($_GET["/timetable/add"])){
	$obj = json_decode($_GET["/timetable/add"], false);
	$array = $dbObject->getTimeTableByUserID($obj->userId);
	if(empty($array)){
		$dbObject->addTimeTableByUserID($obj->userId, $obj->from_1, $obj->to_1, $obj->from_2, $obj->to_2);
	}else{
		$dbObject->updateTimeTable($obj);
	}
	$array = $dbObject->getTimeTableByUserID($obj->userId);
	echo json_encode($array);

}