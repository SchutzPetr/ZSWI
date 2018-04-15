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

if(isset($_GET["addHolidays"])){
	$obj = json_decode($_GET["addHolidays"], false);
	//if some holiday exist
	if(!$dbObject->getHoliday($obj->day)){
		$dbObject->addHolidays($obj->day, $obj->name_holidays);
	}else{
		//TODO return error
	}
}
if(isset($_GET["deleteHolidays"])){
	$obj = json_decode($_GET["deleteHolidays"], false);
	$dbObject->deleteHolidaysByDay($obj);
}
if(isset($_GET["updateHolidays"])){
	$obj = json_decode($_GET["updateHolidays"], false);
	$dbObject = new DataBase();
	$dbObject->updateHollidays($obj);
}
