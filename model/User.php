<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 21.03.2018
 * Time: 18:43
 */

class User {

	protected $_nameAndLastName;

	protected $_name;
	protected $_lastName = "";
	protected $_email = "";
	protected $_honorificPrefix = "";
	protected $_honorificSuffix = "";
	protected $_authority = "";
	protected $_active = true;
	protected $_mainWorkStation = "";

	protected $_arrayDataByMonth;
	protected $_vacations;
	protected $_hoursByMoth;
	protected $_vacationsHoursByMoth;
	protected $_diseasesHoursByMoth;

	function __construct() {
		$this->_nameAndLastName = "";
		$this->_name = "";
		$this->_lastName = "";
		$this->_email = "";
		$this->_honorificPrefix = "";
		$this->_honorificSuffix = "";
		$this->_authority = "";
		$this->_active = true;
		$this->_mainWorkStation = "";
		$this->_arrayDataByMonth = [];
		$this->_vacations = [];
		$this->_vacationsHoursByMoth = 0;
		$this->_diseasesHoursByMoth = 0;
	}

	function fill($array){
		$this->setName($array);
		$this->_authority = $array['authority'];
		$this->_active = $this->setActive($array['is_active']);
	}

	/***
	 * @param $is must be number
	 *
	 * @return bool
	 */
	function setActive($is){
		if($is==1) return true;
		return false;
	}

	function setName($array){
            echo '<pre>'; print_r($array); echo '</pre>';
		if($array!= null){
			$string = '';
			if($array['honorific_prefix']){
				$string  .= $array['honorific_prefix'] . " ";
				$this->_honorificPrefix=$array['honorific_prefix'];
			}
			if($array['name']){
				$string  .= $array['name'] . " ";
				$this->_name = $array['name'];
			}
			if($array['lastname']){
				$string  .= $array['lastname'] . " ";
				$this->_lastName= $array['lastname'];
			}
			if($array['honorific_suffix']) $string  .= $array['honorific_suffix'];
			$this->nameAndLastName=$string;
		}
	}

	function addMonthData($array){
		print "addMonthData \n";
//		echo '<pre>'; print_r($array); echo '</pre>';
		for($i =0; $i<count($array); $i++){
			$date=date_create($array[$i]['day']);

			$this->_arrayDataByMonth[$i]['day'] = date_format($date,"d.m.Y");
			echo date('N', $date);
			$this->_arrayDataByMonth[$i]['day_type'] = (int) date('N', $date);

			if($array[$i]['from_1']!=null && $array[$i]['to_1']!=null){
				$this->_arrayDataByMonth[$i]['from_1'] = $array[$i]['from_1'];
				$this->_arrayDataByMonth[$i]['to_1'] = $array[$i]['to_1'];

				$time1 = strtotime($array[$i]['from_1']);
				$time2 = strtotime($array[$i]['to_1']);
				$hours = ($time1 - $time2)/60;
				$this->_arrayDataByMonth[$i]['hours_1'] = $hours;
				$this->_hoursByMoth+=$hours;

			}
			if($array[$i]['from_2']!=null && $array[$i]['to_1']!=null){
				$this->_arrayDataByMonth[$i]['pause_from_1'] = $array[$i]['to_1'];
				$this->_arrayDataByMonth[$i]['pause_to_1'] = $array[$i]['from_2'];

				$time1 = strtotime($array[$i]['to_1']);
				$time2 = strtotime($array[$i]['from_2']);
				$hours = ($time1 - $time2)/60;
				$this->_arrayDataByMonth[$i]['pause_hours_1'] = $hours;
				$this->_hoursByMoth+=$hours;

			}

			if($array[$i]['from_2']!=null && $array[$i]['to_2']!=null) {
				$this->_arrayDataByMonth[$i]['from_2'] = $array[$i]['from_2'];
				$this->_arrayDataByMonth[$i]['to_2'] = $array[$i]['to_2'];

				$time1 = strtotime($array[$i]['from_2']);
				$time2 = strtotime($array[$i]['to_2']);
				$hours = ($time1 - $time2)/60;
				$this->_arrayDataByMonth[$i]['hours_2'] = $hours;
				$this->_hoursByMoth+=$hours;

			}

			if($array[$i]['from_2']!=null && $array[$i]['to_2']!=null) {
				$this->arrayDataByMonth[$i]['from_3'] = $array[$i]['from_3'];
				$this->arrayDataByMonth[$i]['to_3'] = $array[$i]['to_3'];

				$time1 = strtotime($array[$i]['from_3']);
				$time2 = strtotime($array[$i]['to_3']);
				$hours = ($time1 - $time2)/60;
				$this->_arrayDataByMonth[$i]['hours_3'] = $hours;
				$this->_hoursByMoth+=$hours;
			}

			if($array[$i]['is_nemoc']==1){
				$this->_arrayDataByMonth[$i]['note1'] = "nemoc";
				$this->_diseasesHoursByMoth+=8;///!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			if($array[$i]['is_vacation']==1){
				$this->_arrayDataByMonth[$i]['note1'] = "dovolená";
			}

			$this->_arrayDataByMonth[$i]['note2'] = $array[$i]['other'];

		}
		$this->_arrayDataByMonth;
	}

	function getMonthData(){
		return $this->arrayDataByMonth;
	}

	function printDataUser(){
		return $this->_nameAndLastName;
	}

	function getDataUserToJS(){
		$object = array("name"=>$this->_name,
						"lastName"=>$this->_lastName,
						"email"=>$this->_email,
						"honorificPrefix"=>$this->_honorificPrefix,
						"honorificSuffix"=>$this->_honorificSuffix,
						"authority"=>$this->_authority,
						"active"=>$this->_active,
						"mainWorkStation"=>$this->_mainWorkStation
			);
		$myJSON = json_encode((array)$object);
		echo $myJSON;
	}

}