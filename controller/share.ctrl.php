<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 21.04.2018
 * Time: 11:43
 */


header("Content-Type: application/json; charset=UTF-8");

include_once("../model/db.php");

function fillUser($array){
	$user = new User();
	if(!empty($array)){
		$user->fill($array);
	}
	return $user;
}

$dbObject = new DataBase();

if(isset($_GET["/share/add"])){
	$obj = json_decode($_GET["/share/add"], false);
	$array = $dbObject->getSharing($obj->userId, $obj->shareTo);
	if(empty($array)){
		if($dbObject->addSharingByUserID($obj->userId, $obj->shareTo)){
			echo json_encode(true);
		}
	}

}else if(isset($_GET["/share/remove"])){
	$obj = json_decode($_GET["/share/remove"], false);
	if($dbObject->deleteSharingById($obj->userId, $obj->shareTo)){
		echo json_encode(true);
	}

}else if(isset($_GET["/share/getSharing"])){ ///co vrátí seznam uživatelů, kterým daný uživatel sdílí
	$obj = json_decode($_GET["/share/getSharing"], false);
	$array = $dbObject->getAllSharingByUserId($obj->userId);
	$arrayUser = [];
	echo '<pre>'; print_r($array); echo '</pre>';

	if(!empty($array)){
		for($i = 0; $i<count($array); $i++){
			$arrayUser = $dbObject->getUserById($array[$i]['share_to']);
			$user = fillUser($arrayUser);
			$arrayUser[$i] = $user->getDataUserToJS();
		}
	}
	echo json_encode($arrayUser);
}
