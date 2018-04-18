<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.04.2018
 * Time: 12:23
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
include_once("../model/Shedule.php");

$dbObject = new DataBase();

if(isset($_GET["/shedule/generate"])){
	$obj = json_decode($_GET["/shedule/generate"], false);
	echo '<pre>'; print_r($obj); echo '</pre>';

	$array = $dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->userId);
	if(count($array) == 0){
		$array = $dbObject->generateMonthSheduleForUser($obj->userId, $obj->month, $obj->year);
	}
	$objectArray = [];
	if($array != null){
		for($i =0; $i<count($array); $i++){
			$shedule = new Shedule();
			$shedule->setId($array[$i]['id']);
			$shedule->setUserId($array[$i]['user_id']);
			$shedule->setDate($array[$i]['day']);
			if($array[$i]['is_nemoc'] == 0){
				$shedule->setDayType("nemoc");
			}else{
				if($array[$i]['is_vacation'] == 0){
					$shedule->setDayType($array[$i]['other']);
				}else{
					$typeVacation = $dbObject->getVacationByID($array[$i]['is_vacation'])['type'];
					$shedule->setDayType($typeVacation);
				}
				$shedule->setFirstPartFrom($array[$i]['from_1']);
				$shedule->setFirstPartTo($array[$i]['to_1']);
				$shedule->setSecondPartFrom($array[$i]['from_2']);
				$shedule->setSecondPartTo($array[$i]['to_2']);
				$shedule->setThirdPartFrom($array[$i]['from_3']);
				$shedule->setThirdPartFrom($array[$i]['to_3']);
			}
			$objectArray[$i] = $shedule->getDataToForJSON();
		}
	}
	echo json_encode($objectArray);
}
if(isset($_POST["/shedule/get/id"])){
	$obj = json_decode($_GET["shedule/get/id"], false);
	$dbObject->getSheduleById($obj);
}
if(isset($_POST["/shedule/getByUserIdAndMonth"])){
	$obj = json_decode($_GET["getByUserIdAndMonth"], false);
	$dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->user_id);
}
if(isset($_GET["/shedule/update/id"])){
	$obj = json_decode($_GET["/shedule/update/id"], false);
	$dbObject->updateSheduleById($obj->id, $obj->day, $obj->is_nemoc, $obj->is_vacation, $obj->other, $obj->from_1, $obj->to_1,
		$obj->from_2, $obj->to_2, $obj->from_3, $obj->to_3);
}

if(isset($_POST["/shedule/delete/id"])){
	$obj = json_decode($_GET["/shedule/delete/id"], false);
	$dbObject->deleteSheduleById($obj);
}


