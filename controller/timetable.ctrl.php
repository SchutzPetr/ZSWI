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

/***
 * zmeni polozku timetable v db
 *
 */
if(isset($_GET["/timetable/update/id"])){
	$obj = json_decode($_GET["/timetable/update/id"], false);
	$dbObject->updateTimeTable($obj);
}
/***
 * prida novy timetable
 * ocekava na objekt s userId,
 * from1 (cas ve formatu 08:00:00), to1 (cas ve formatu 08:00:00),
 * from2 (cas ve formatu 08:00:00), to2 (cas ve formatu 08:00:00)
 *
 * jestli timetable jiz existuje - zmeni ho.
 *
 */
else if(isset($_GET["/timetable/add"])){
	$obj = json_decode($_GET["/timetable/add"], false);
	$array = $dbObject->getTimeTableByUserID($obj->userId);
	if(empty($array)){
		$dbObject->addTimeTableByUserID($obj->userId, $obj->from1, $obj->to1, $obj->from2, $obj->to2);
	}else{
		$dbObject->updateTimeTable($obj);
	}
	$array = $dbObject->getTimeTableByUserID($obj->userId);
	echo json_encode($array);

}