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

/***
 * Vrati objekt user podle logina, jestli takovy existuje v db
 * ceka na objekt s login
 */
if(isset($_GET["/user/login"])){
	$obj = json_decode($_GET["/user/login"], false);
//	echo '<pre>'; print_r($obj); echo '</pre>';
	$array = $dbObject->getUserByLogin($obj->login, '');
	if(!empty($array)){
		$user = fillUser($array);
		echo json_encode($user->getDataUserToJS());
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
}
/***
 * Vrati posledni projekty usera s db
 * ceka na userId
 */
else if(isset($_GET["/user/project/getLastByUserId"])){
	$obj = json_decode($_GET["/user/project/getLastByUserId"], false);
	$arrayContract=$dbObject->getLastUserContract($obj->userId);
	if(!empty($arrayContract)){
		$arrayProject = $dbObject->getAllActiveEmployment($arrayContract["id"]);
		$projects = [];
		$projects['contract'] = $arrayContract;
		if(!empty($arrayProject)){
			for($i = 0; $i< count($arrayProject); $i++){
				$projects[$i] = $dbObject->getProjectById($arrayProject[$i]["project_id"]);
			}
		}
		echo json_encode($projects);
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
}
/***
 * Vrati double procent zamestnani na contractach usera
 * ceka na objekt s userId
 */
else if(isset($_GET["/user/contract/id"])){
	$obj = json_decode($_GET["/user/contract/id"], false);
	echo json_encode($dbObject->getTypeContractByUserID($obj->userId));
}
/***
 * Vrati usera z db podle id
 * ceka na objekt s id
 */
else if(isset($_GET["/user/getById"])){
	$obj = json_decode($_GET["/user/getById"], false);
	$array = $dbObject->getUserById($obj->id);
	if(!empty($array)){
		$user = fillUser($array);
		echo json_encode($user->getDataUserToJS());
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
}
/***
 * Udela update usera v db
 * ceka na objekt s id, name, lastname, honorific_prefix, honorific_suffix, authority, is_active, main_work_station
 */
else if(isset($_GET["/user/update/id"])){
	$obj = json_decode($_GET["/user/update/id"], false);
	if($dbObject->updateUser($obj)){
		echo json_encode(true);
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
}
/***
 * Prida objekt user do db, jestli user s takovy orionLogin zatim v db neexistuje
 * ceka na objekt s orionLogin, name, lastName, honorificPrefix, honorificSuffix, authority, mainWorkStation (nebo KIV, nebo NTIS),
 * percent (vytvori prvni contract)
 */
else if(isset($_GET["/user/addNewUser"])){
	$obj = json_decode(urldecode($_GET["/user/addNewUser"], false));
	echo $obj->orionLogin;
	$userArray = $dbObject->getUserByLogin($obj->orionLogin, "");
	if(empty($userArray)){
		if($dbObject->addNewUser($obj->orionLogin, $obj->name, $obj->lastName,
			$obj->honorificPrefix, $obj->honorificSuffix, $obj->authority, $obj->mainWorkStation)) {
			$array = $dbObject->getUserByLogin( $obj->orionLogin, "123" );
			if(!empty($array)){
				echo $obj->mainWorkStation;
				echo (strcmp($obj->mainWorkStation,'KIV')==0);
				if(strcmp($obj->mainWorkStation,'KIV')==0){
					if ( $dbObject->addNewContract( $array["id"], 0, $obj->percent, null ) ) {
						echo json_encode(true);
					}
				}else{
					if ( $dbObject->addNewContract( $array["id"], $obj->percent, 0, null ) ) {
						echo json_encode(true);
					}
				}
			}
		}
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}

}
/***
 * Vrati vse objekty user z db
 */
else if(isset($_GET["/user/getAllUsers"])){
	$array = $dbObject->getAllUsersForAdmin();
	if(!empty($array)){
		$userArray = [];
		for($i = 0; $i<count($array); $i++){
			$user = fillUser($array[$i]);
			$userArray[$i] = $user->getDataUserToJS();
		}
		echo json_encode($userArray);
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
}



