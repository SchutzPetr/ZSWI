<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 08.05.2018
 * Time: 15:36
 */

header("Content-Type: application/json; charset=UTF-8");
include_once("../model/db.php");

function getInJsonFormat($array){
	$object = array("id"=>$array['id'],
	                "name"=>$array['project_name'],
	                "shortName"=>$array['project_name_short'],
	                "description"=>$array['description']
	);
	return $object;
}

$dbObject = new DataBase();

/***
 * Vrati project podle id
 * ceka na objekt s id
 */
if(isset($_GET["/project/getById"])){
	$obj = json_decode($_GET["/project/getById"], false);
	$array = $dbObject->getProjectById($obj->id);
	if(!empty($array)){
		$project = getInJsonFormat($array);
		echo json_encode($project);
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}

}
/***
 * Vrati vse projecty v db
 */
if(isset($_GET["/project/getAll"])){
	$obj = json_decode($_GET["/project/getAll"], false);
	$array = $dbObject->getAllProject();
//		echo '<pre>'; print_r($array); echo '</pre>';

	if(!empty($array)){
		$projects = [];
		for($i=0;$i<count($array); $i++){
			$projects[$i] = getInJsonFormat($array[$i]);
		}
		echo json_encode($projects);
	}else{
		header('HTTP/1.1 500 Internal Server Booboo');
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}

}

