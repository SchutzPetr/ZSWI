<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 07.04.2018
 * Time: 11:43
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

if(isset($_GET["addVacation"])){
	$obj = json_decode($_GET["addVacation"], false);
	$dbObject = new MyDB();

}
if(isset($_GET["deleteVacation"])){
	$obj = json_decode($_GET["deleteVacation"], false);
	$dbObject = new MyDB();

}
if(isset($_GET["setVacation"])){
	$obj = json_decode($_GET["setVacation"], false);
	$dbObject = new MyDB();

}
