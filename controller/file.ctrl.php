<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 04.05.2018
 * Time: 15:36
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
include_once("../model/fileworker.php");
$dbObject = new DataBase();
$fw = new fileworker();

if(isset($_GET["/file/generateOne"])){
	$obj = json_decode($_GET["/file/generateOne"], false);
	$userArray = $dbObject->getUserById($obj->userId);
	$user = new User();
	$user->fill($userArray);

	$array = $dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->userId);
	if(empty($array)){
		$dbObject->generateMonthSheduleForUser($obj->month, $obj->year, $obj->userId);
		$array = $dbObject->getSheduleUserByMonthAndYear($obj->month, $obj->year, $obj->userId);
	}
	$user->addMonthData($array);
	$arr[0]= $user;
	$fw->generateReportForOneMonth($obj->month, $obj->year, $array);
}
