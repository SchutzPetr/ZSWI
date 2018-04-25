<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.04.2018
 * Time: 11:43
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
include_once("../model/constant.php");

$dbObject = new DataBase();

if(isset($_GET["/vacation/getByUserId"])){
	$obj = json_decode($_GET["/vacation/userid"], false);
	$array = $dbObject->getVacationByUserInYear($obj->userId, $obj->year);
	$howManyDays = 0;
	for($i=0; $i<count($array); $i++){
		$howManyDays =+ $array[$i]->type;
	}
	echo json_encode($howManyDays);
}

if(isset($_GET["/vacation/getByUserIdAndYear"])){
	$obj = json_decode($_GET["/vacation/getByUserIdAndYear"], false);
	$array = $dbObject->getVacationByUserInYear($obj->userId, $obj->year);
	$howManyDays = 0;
	for($i=0; $i<count($array); $i++){
		$howManyDays =+ $array[$i]->type;
	}
	$number = $dbObject->getTypeContract($obj->userId);
	echo json_encode($number*FULLTIME_VACATIONS_DAY - $howManyDays);
}

if(isset($_GET["/vacation/add"])){
	$obj = json_decode($_GET["/vacation/add"], false);
	$array = $dbObject->addVacationToUser($obj->day, $obj->type ,$obj->userId);
	echo json_encode($array[0]);
}
if(isset($_GET["/vacation/delete/id"])){
	$obj = json_decode($_GET["/vacation/delete/id"], false);
	$array = $dbObject->getVacationByID($obj->id);
	$shedule = $dbObject->getSheduleByDay($array["day"]);
	$time_table = $dbObject->getTimeTableByUserID($shedule["user_id"]);

	if($dbObject->deleteVacationByID($obj)){
		$dbObject->updateSheduleById($shedule["id"], $shedule["day"], $shedule["is_nemoc"],
			0, $shedule["other"], $time_table["from_1"], $time_table["to_1"], $time_table["from_2"],
			$time_table["to_2"], "", "");
		echo json_encode(true);
	}
}

