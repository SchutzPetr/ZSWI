<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 03.04.2018
 * Time: 18:32
 */
header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");
$dbObject = new DataBase();

if(isset($_GET["/user/login"])){
	$obj = json_decode($_GET["/user/login"], false);
	echo "1 \n";
	echo '<pre>'; print_r($obj); echo '</pre>';
	$array = $dbObject->getUserByLogin($obj->login, $obj->password);
	if($array != null){
		$user = new User();
		$user->fill($array);
		$user->setContract($dbObject->getTypeContract($user->getId()));
		$user->setVacationHourByYear($dbObject->getVacationHourInYear($user->getId(), date("Y")));
	}
	echo json_encode($user->getDataUserToJS());
}else if(isset($_GET["/user/project/id"])){
	$obj = json_decode($_GET["/user/project/id"], false);
	echo "2 \n";

	$array = $dbObject->getLastProjectsUserById($obj);
	echo json_encode($array);
} else if(isset($_GET["/user/contract/id"])){
	$obj = json_decode($_GET["/user/contract/id"], false);
	echo "3 \n";

	echo json_encode($dbObject->getTypeContract($obj));
} else if(isset($_GET["/user/id"])){
	$obj = json_decode($_GET["getUserByID"], false);
	echo "4 \n";

	echo json_encode($dbObject->getUserById($obj));
} else if(isset($_GET["/user/update/id"])){
	$obj = json_decode($_GET["/user/update/id"], false);
	echo "5 \n";

	$dbObject->updateUser($obj);
} else if(isset($_POST["/timetable/update/id"])){
	$obj = json_decode($_GET["/timetable/update/id"], false);
	echo "6 \n";

	$dbObject->updateTimeTable($obj);
}



