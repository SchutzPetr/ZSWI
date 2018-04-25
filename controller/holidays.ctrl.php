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

/***
 * prida novou polozku v tabulku holidays
 * ocekava na objekt s day (format YYYY-MM-DD), nameHolidays (nazev)
 * jestli jiz existuje ve stejny den - neprida
 */
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
/****
 * smaze holidays podle id
 * ocekava na objekt s day(format YYYY-MM-DD)
 */
if(isset($_GET["/holidays/delete/id"])){
	$obj = json_decode($_GET["/holidays/delete/id"], false);
	if($dbObject->deleteHolidaysByDay($obj->day)){
		echo json_encode(true);
	}
}
/****
 * smaze holidays podle id
 * ocekava na objekt s day(format YYYY-MM-DD), name, id
 */
if(isset($_GET["/holidays/update"])){
	$obj = json_decode($_GET["/holidays/update"], false);
	if($dbObject->updateHollidays($obj->day, $obj->name, $obj->id)){
		echo json_encode($dbObject->getHolidayByDay($obj->day));
	}
}
