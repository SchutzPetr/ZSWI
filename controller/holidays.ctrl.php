<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.04.2018
 * Time: 11:46
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
$dbObject = new DataBase();

if(isset($_GET["/holidays/add"])){
	$obj = json_decode($_GET["/holidays/add"], false);
	//if some holiday exist
	if(!$dbObject->getHoliday($obj->day)){
		$dbObject->addHolidays($obj->day, $obj->name_holidays);
	}else{
		//TODO return error
	}
}
if(isset($_GET["/holidays/delete/id"])){
	$obj = json_decode($_GET["/holidays/delete/id"], false);
	$dbObject->deleteHolidaysByDay($obj);
}
if(isset($_GET["/holidays/update"])){
	$obj = json_decode($_GET["/holidays/update"], false);
	$dbObject->updateHollidays($obj);
}
