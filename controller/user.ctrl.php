<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 03.04.2018
 * Time: 18:32
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

function fillUser($array){
	$dbObject = new DataBase();

	$user = new User();
	if(!empty($array)){
		$user->fill($array);
		$user->setContract($dbObject->getTypeContract($user->getId()));
		$user->setVacationHourByYear($dbObject->getVacationHourInYear($user->getId(), date("Y")));
	}
	return $user;
}

$dbObject = new DataBase();

if(isset($_GET["/user/login"])){
	$obj = json_decode($_GET["/user/login"], false);
	echo '<pre>'; print_r($obj); echo '</pre>';
	$array = $dbObject->getUserByLogin($obj->login, $obj->password);
	$user = fillUser($array);
	echo json_encode($user->getDataUserToJS());

}else if(isset($_GET["/user/project/getLastByUserId"])){
	$obj = json_decode($_GET["/user/project/getLastByUserId"], false);

	$array = $dbObject->getLastProjectsUserById($obj);
	echo json_encode($array);
} else if(isset($_GET["/user/contract/id"])){
	$obj = json_decode($_GET["/user/contract/id"], false);

	echo json_encode($dbObject->getTypeContract($obj));
} else if(isset($_GET["/user/getById"])){
	$obj = json_decode($_GET["getUserByID"], false);
	$array = $dbObject->getUserById($obj);
	$user = fillUser($array);
	echo json_encode($user->getDataUserToJS());

} else if(isset($_GET["/user/update/id"])){
	$obj = json_decode($_GET["/user/update/id"], false);
	$dbObject->updateUser($obj);

}



