<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 26.04.2018
 * Time: 12:32
 */
header("Content-Type: application/json; charset=UTF-8");
include_once("../model/db.php");

function addNotification($title, $description, $link){
	$dbObject = new DataBase();
	$dbObject->addNotification($title, $description,$link);
}

$dbObject = new DataBase();


/****
 * vrati pole novych (neprecteny) notifications
 *
 */
if(isset($_GET["/notification/getAllActive"])){
	$obj = json_decode($_GET["/notification/getAllActive"], false);
	$array = $dbObject->getAllOpenNotification();
	echo json_encode($array);
}

/****
 * zmeni stav notification
 * ocekavana na objekt s id
 */
if(isset($_GET["/notification/setNotification"])){
	$obj = json_decode($_GET["/notification/setNotification"], false);
	$array = $dbObject->closeNotification($obj->id);
}

/****
 * vrati pole notifications
 *
 */
if(isset($_GET["/notification/getAllActive"])){
	$obj = json_decode($_GET["/notification/getAllActive"], false);
	$array = $dbObject->getAllNotification();
	echo json_encode($array);
}