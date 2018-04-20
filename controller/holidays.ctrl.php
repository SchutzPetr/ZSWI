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
	if(!$dbObject->getHolidayByDay($obj->day)){
		if($dbObject->addHolidays($obj->day, $obj->nameHolidays)){
			echo json_encode($dbObject->getHolidayByDay($obj->day));
		}
	}else{
		//TODO return error
	}
}
if(isset($_GET["/holidays/delete/id"])){
	$obj = json_decode($_GET["/holidays/delete/id"], false);
	if($dbObject->deleteHolidaysByDay($obj)){
		echo json_encode(true);
	}
}
if(isset($_GET["/holidays/update"])){
	$obj = json_decode($_GET["/holidays/update"], false);
	if($dbObject->updateHollidays($obj)){
		echo json_encode($dbObject->getHolidayByDay($obj->day));
	}
}
