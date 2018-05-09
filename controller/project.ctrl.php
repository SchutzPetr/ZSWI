<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 08.05.2018
 * Time: 15:36
 */
header("Access-Control-Allow-Origin: *");
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
/****
 * prida novy project do db
 * ocekava objekt z projectName (nazev projekta), projectNameShort (zkraceny nazev projekta),
 *  description (popis projekta)
 */
else if(isset($_GET["/project/addNewProject"])){
    $obj = json_decode(urldecode($_GET["/project/addNewProject"]), false);
    if($dbObject->addNewProject($obj->name, $obj->shortName, $obj->description)){
        return true;
    }else{
        header('HTTP/1.1 500 Internal Server Booboo');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
    }
}
/***
 * zmeni polozku Project
 * ocekava na id (project id),  projectName (nazev projekta), projectNameShort (zkraceny nazev projekta), description
 */
else if(isset($_GET["/project/updateProject"])){
    $obj = json_decode(urldecode($_GET["/contract/updateProject"]), false);
    if($dbObject->updateProject($obj->id, $obj->projectName, $obj->projectNameShort, $obj->description)){
        return true;
    }
}
/***
 * Vrati vse projecty v db
 */
if(isset($_GET["/project/getAll"])){
	$obj = json_decode($_GET["/project/getAll"], false);

    try {
        $array = $dbObject->getAllProject();

        $projects = [];
        for($i=0;$i<count($array); $i++){
            $projects[$i] = getInJsonFormat($array[$i]);
        }
        echo json_encode($projects);
    }catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Booboo');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
        //echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
}

