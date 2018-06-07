<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 24.04.2018
 * Time: 19:50
 */
header("Content-Type: application/json; charset=UTF-8");
include_once("../model/db.php");

$dbObject = new DataBase();

/****
 * vrati contract
 * ocekava objekt z userId
 */
if(isset($_GET["/contract/getById"])){
	$obj = json_decode($_GET["/contract/getById"], false);
	$array = $dbObject->getUserContractById($obj->userId);
	echo json_encode($array);
}
/***
 * prida novy contract do DB
 * jestli jiz nejaky contract existuje - "uzavri" ho se stejnym datumem
 * ocekava objekt z userId, nts (double cislo zamestnani na ntis), kiv (double cislo zamestnani na kivu),
 * date (datum od kdy je platny contract, muze byt NULL - v takovym pripade se vezme dnesni datum)
 */
else if(isset($_GET["/contract/addNewContract"])){
	$obj = json_decode($_GET["/contract/addNewContract"], false);
	$contract = $dbObject->getLastUserContract($obj->userId);
	if(!empty($contract)){
		$dbObject->closeContract($contract['id'], $obj->date);
	}
	if($dbObject->addNewContract($obj->userId, $obj->nts, $obj->kiv, $obj->date)){
		return true;
	}
}
/***
 * prida novy employment do db
 * ocekava objekt z userContractId, projectId, percent (double cislo zamestnani na projektu),
 * date (datum od kdy je platny, muze byt NULL - v takovym pripade se vezme dnesni datum)
 *
 */
else if(isset($_GET["/contract/addNewEmployment"])){
	$obj = json_decode($_GET["/contract/addNewEmployment"], false);
	$existContract = !empty($dbObject->getUserContractById($obj->userContractId));
	$existProject = !empty($dbObject->getProjectById($obj->projectId));
	if($existContract && $existProject){
		if($dbObject->addNewEmployment($obj->userContractId, $obj->projectId, $obj->percent, $obj->date)){
			return true;
		}
	}
}
/***
 * "uzavri" contract
 * zmeni datum okonceni z NULL na nejakou hodnotu, contract se nebude vyskytovat mezi aktualni
 * ocekava na date (muze byt NULL - v takovym pripade se vezme dnesni datum)
 */
else if(isset($_GET["/contract/closeContract"])){
	$obj = json_decode($_GET["/contract/closeContract"], false);
	if($dbObject->closeContract($obj->id, $obj->date)){
		return true;
	}
}
/***
 * "uzavri" Employment
 * zmeni datum okonceni z NULL na nejakou hodnotu, Employment se nebude vyskytovat mezi aktualni
 * ocekava na date (muze byt NULL - v takovym pripade se vezme dnesni datum)
 */
else if(isset($_GET["/contract/closeEmployment"])){
	$obj = json_decode($_GET["/contract/closeEmployment"], false);
	if($dbObject->closeEmployment($obj->id, $obj->date)){
		return true;
	}
}