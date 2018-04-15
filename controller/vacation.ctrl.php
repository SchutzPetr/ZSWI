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

if(isset($_GET["getNumberOfVacationsDayInYear"])){
	$obj = json_decode($_GET["getVacationsDay"], false);
	$array = $dbObject->getVacationByUserInYear($obj->userId, $obj->year);
	$howManyDays = 0;
	for($i=0; $i<count($array); $i++){
		$howManyDays =+ $array[$i]->type;
	}
	echo json_encode($howManyDays);
}

if(isset($_GET["getRemainingNumberOfVacationsDayInYear"])){
	$obj = json_decode($_GET["getRemainingNumberOfVacationsDayInYear"], false);
	$array = $dbObject->getVacationByUserInYear($obj->userId, $obj->year);
	$howManyDays = 0;
	for($i=0; $i<count($array); $i++){
		$howManyDays =+ $array[$i]->type;
	}
	$number = $dbObject->getTypeContract($obj->userId);
	echo json_encode($number*FULLTIME_VACATIONS_DAY - $howManyDays);
}

if(isset($_GET["addVacation"])){
	$obj = json_decode($_GET["addVacation"], false);
	$dbObject->addVacationToUser($obj->day, $obj->type ,$obj->userId);

}
if(isset($_GET["deleteVacation"])){
	$obj = json_decode($_GET["deleteVacation"], false);
	$dbObject->deleteVacationByID($obj);
}
if(isset($_GET["setVacation"])){
	$obj = json_decode($_GET["setVacation"], false);
}
