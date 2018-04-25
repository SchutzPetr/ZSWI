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

/****
 * prida novy share_timesheet
 * ocekava na objekt s userId (user from), shareTo (id user to)
 * prijda jenom jiz takovy share_timesheet neexistuje
 */
if(isset($_GET["/share/add"])){
	$obj = json_decode($_GET["/share/add"], false);
	$array = $dbObject->getSharing($obj->userId, $obj->shareTo);
	if(empty($array)){
		if($dbObject->addSharingByUserID($obj->userId, $obj->shareTo)){
			echo json_encode(true);
		}
	}

}
/***
 * smaze share_timesheet z db
 * ocekava na objekt s userId (user from), shareTo (id user to)
 */
else if(isset($_GET["/share/remove"])){
	$obj = json_decode($_GET["/share/remove"], false);
	if($dbObject->deleteSharing($obj->userId, $obj->shareTo)){
		echo json_encode(true);
	}

}
/***
 * vrati objecty share_timesheet
 * ocekava na objekt s userId (user from)
 */

else if(isset($_GET["/share/getSharingTo"])){ ///co vrátí seznam uživatelů, kterým daný uživatel sdílí
	$obj = json_decode($_GET["/share/getSharingTo"], false);
	$array = $dbObject->getAllSharingByUserId($obj->userId);
	$arrayUser = [];
	if(!empty($array)){
		for($i = 0; $i<count($array); $i++){
			$arrayUser = $dbObject->getUserById($array[$i]['share_to']);
			$user = fillUser($arrayUser);
			$arrayUser[$i] = $user->getDataUserToJS();
		}
	}
	echo json_encode($arrayUser);
}
/***
 * vrati objecty share_timesheet
 * ocekava na objekt s userId (user to)
 */
else if(isset($_GET["/share/getSharing"])){
	$obj = json_decode($_GET["/share/getSharing"], false);
	$array = $dbObject->getSharingListByID($obj->userId);
	$arrayUser = [];
	if(!empty($array)){
		for($i = 0; $i<count($array); $i++){
			$arrayUser = $dbObject->getUserById($array[$i]['share_to']);
			$user = fillUser($arrayUser);
			$arrayUser[$i] = $user->getDataUserToJS();
		}
	}
	echo json_encode($arrayUser);
}
