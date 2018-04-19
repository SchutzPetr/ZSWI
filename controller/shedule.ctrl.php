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

function fillShedule($array){
	$shedule = new Shedule();
	$dbObject = new DataBase();

	if(count($array)!=0){
		$shedule->setId($array['id']);
		$shedule->setUserId($array['user_id']);
		$shedule->setDate($array['day']);
		if($array['is_nemoc'] == 0){
			$shedule->setDayType("nemoc");
		}else{
			if($array['is_vacation'] == 0){
				$shedule->setDayType($array['other']);
			}else{
				$typeVacation = $dbObject->getVacationByID($array['is_vacation'])['type'];
				$shedule->setDayType($typeVacation);
			}
			$shedule->setFirstPartFrom($array['from_1']);
			$shedule->setFirstPartTo($array['to_1']);
			$shedule->setSecondPartFrom($array['from_2']);
			$shedule->setSecondPartTo($array['to_2']);
			$shedule->setThirdPartFrom($array['from_3']);
			$shedule->setThirdPartFrom($array['to_3']);
		}
	}
	return $shedule;
}


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
			$shedule = fillShedule($array[$i]);
			$objectArray[$i] = $shedule->getDataToForJSON();
		}
	}
	echo json_encode($objectArray);
}
if(isset($_POST["/shedule/get/id"])){
	$obj = json_decode($_GET["shedule/get/id"], false);
	$array = $dbObject->getSheduleById($obj->id);
	$shedule = fillShedule($array);
	echo json_encode($shedule->getDataToForJSON());
}
if(isset($_POST["/shedule/getByUserIdAndMonth"])){
	$obj = json_decode($_GET["getByUserIdAndMonth"], false);
	$array = $dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->user_id);
	if(count($array) == 0){
		$array = $dbObject->generateMonthSheduleForUser($obj->userId, $obj->month, $obj->year);
	}
	$objectArray = [];
	if($array != null){
		for($i =0; $i<count($array); $i++){
			$shedule = fillShedule($array[$i]);
			$objectArray[$i] = $shedule->getDataToForJSON();
		}
	}
	echo json_encode($objectArray);

}
if(isset($_GET["/shedule/update/id"])){
	$obj = json_decode($_GET["/shedule/update/id"], false);
	$dbObject->updateSheduleById($obj->id, $obj->day, $obj->is_nemoc, $obj->is_vacation, $obj->other, $obj->from_1, $obj->to_1,
		$obj->from_2, $obj->to_2, $obj->from_3, $obj->to_3);
}

if(isset($_POST["/shedule/delete/id"])){
	$obj = json_decode($_GET["/shedule/delete/id"], false);
	if($dbObject->deleteSheduleById($obj)){
		echo json_encode(true);
	}
}


