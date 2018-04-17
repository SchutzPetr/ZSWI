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

if(isset($_GET["/vacation/userid"])){
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
	$dbObject->addVacationToUser($obj->day, $obj->type ,$obj->userId);

}
if(isset($_GET["/vacation/delete/id"])){
	$obj = json_decode($_GET["/vacation/delete/id"], false);
	$dbObject->deleteVacationByID($obj);
}
if(isset($_GET["/vacation/update/id"])){
	$obj = json_decode($_GET["/vacation/update/id"], false);
}
