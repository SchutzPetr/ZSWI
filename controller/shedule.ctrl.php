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

if(isset($_GET["updateShedule"])){
	$obj = json_decode($_GET["updateShedule"], false);
	$dbObject->updateUser($obj);
}
if(isset($_GET["getSheduleByUserIDMonthAndYear"])){
	$obj = json_decode($_GET["getSheduleByUserIDMonthAndYear"], false);
	$array = $dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->user_id);
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
			$objectArray[$i] = $shedule;
		}
	}
	echo json_encode($objectArray);
}
if(isset($_POST["generateSheduleForOneUser"])){
	$obj = json_decode($_GET["generateShedule"], false);
	$dbObject->updateTimeTable($obj);
}
if(isset($_POST["generateSheduleForAllActiveUser"])){
	$obj = json_decode($_GET["generateShedule"], false);
	$dbObject->updateTimeTable($obj);
}
if(isset($_POST["deleteShedule"])){
	$obj = json_decode($_GET["deleteShedule"], false);
	$dbObject->updateTimeTable($obj);
}

