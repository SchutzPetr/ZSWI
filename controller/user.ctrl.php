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
		$user->setContract($dbObject->getTypeContractByUserID($user->getId()));
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
	$arrayContract=$dbObject->getLastUserContract($obj->userId);
	$arrayProject = $dbObject->getAllActiveEmployment($arrayContract["id"]);
	$projects = [];
	$projects['contract'] = $arrayContract;
	if(!empty($arrayProject)){
		for($i = 0; $i< count($arrayProject); $i++){
			$projects[$i] = $dbObject->getProjectById($arrayProject[$i]["project_id"]);
		}
	}

	echo json_encode($projects);
} else if(isset($_GET["/user/contract/id"])){
	$obj = json_decode($_GET["/user/contract/id"], false);

	echo json_encode($dbObject->getTypeContractByUserID($obj));
} else if(isset($_GET["/user/getById"])){
	$obj = json_decode($_GET["getUserByID"], false);
	$array = $dbObject->getUserById($obj->id);
	$user = fillUser($array);
	echo json_encode($user->getDataUserToJS());

} else if(isset($_GET["/user/update/id"])){
	$obj = json_decode($_GET["/user/update/id"], false);
	$dbObject->updateUser($obj);
} else if(isset($_GET["/user/addNewUser"])){
	$obj = json_decode($_GET["/user/addNewUser"], false);
	$userArray = $dbObject->getUserByLogin($obj->orion_login, "123");
	if(empty($userArray)){
		if($dbObject->addNewUser($obj->orion_login, $obj->name, $obj->lastname,
			$obj->honorificPrefix, $obj->honorificSuffix, $obj->authority, $obj->mainWorkStation)) {

			$array = $dbObject->getUserByLogin( $obj->orion_login, "123" );
			if(!empty($array)){
				if($obj->mainWorkStation==="KIV"){
					if ( $dbObject->addNewContract( $array["id"], 0, $obj->percent, null ) ) {
						return true;
					}
				}else{
					if ( $dbObject->addNewContract( $array["id"], $obj->percent, 0, null ) ) {
						return true;
					}
				}

			}
		}
	}else{
		echo "user is exist \n";
		$array = $dbObject->getUserByLogin( "test", "123" );
		echo '<pre>'; print_r($array); echo '</pre>';
		echo '<pre>'; print_r($dbObject->getTypeContractByUserID($array["id"])); echo '</pre>';
	}

}else if(isset($_GET["/user/getAllUsers"])){
	$array = $dbObject->getAllUsersForAdmin();
	$userArray = [];
	for($i = 0; $i<count($array); $i++){
		$user = fillUser($array[$i]);
		$userArray[$i] = $user->getDataUserToJS();
	}
	echo json_encode($userArray);
}



