<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 21.03.2018
 * Time: 18:43
 */

class User {

	public $nameAndLastName;
	public $arrayDataByMonth;
	public $isActive;
	public $authority;
	public $vacations;
	public $hoursByMoth;
	public $vacationsHoursByMoth;
	public $diseasesHoursByMoth;

	function __construct() {
//		print "Конструктор класса BaseClass\n";
	}
//
//	function __construct1($array) {
//		print "construct";
//		$this->setName($array);
//		$this->authority = $array['$authority'];
//		$this->isActive = $this->setActive($array['$authority']);
//	}

	function fill($array){
		$this->setName($array);
		$this->authority = $array['authority'];
		$this->isActive = $this->setActive($array['is_active']);
		$this->arrayDataByMonth=[];
		$this->hoursByMoth = 0;
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
			if($array['honorific_prefix']) $string  .= $array['honorific_prefix'] . " ";
			if($array['name']) $string  .= $array['name'] . " ";
			if($array['lastname']) $string  .= $array['lastname'] . " ";
			if($array['honorific_suffix']) $string  .= $array['honorific_suffix'];
			$this->nameAndLastName=$string;
		}
	}

	function addMonthData($array){
		print "addMonthData \n";
//		echo '<pre>'; print_r($array); echo '</pre>';
		for($i =0; $i<count($array); $i++){
			$date=date_create($array[$i]['day']);

			$this->arrayDataByMonth[$i]['day'] = date_format($date,"d.m.Y");
			echo date('N', $date);
			$this->arrayDataByMonth[$i]['day_type'] = (int) date('N', $date);

			if($array[$i]['from_1']!=null && $array[$i]['to_1']!=null){
				$this->arrayDataByMonth[$i]['from_1'] = $array[$i]['from_1'];
				$this->arrayDataByMonth[$i]['to_1'] = $array[$i]['to_1'];

				$time1 = strtotime($array[$i]['from_1']);
				$time2 = strtotime($array[$i]['to_1']);
				$hours = ($time1 - $time2)/60;
				$this->arrayDataByMonth[$i]['hours_1'] = $hours;
				$this->hoursByMoth+=$hours;

			}
			if($array[$i]['from_2']!=null && $array[$i]['to_1']!=null){
				$this->arrayDataByMonth[$i]['pause_from_1'] = $array[$i]['to_1'];
				$this->arrayDataByMonth[$i]['pause_to_1'] = $array[$i]['from_2'];

				$time1 = strtotime($array[$i]['to_1']);
				$time2 = strtotime($array[$i]['from_2']);
				$hours = ($time1 - $time2)/60;
				$this->arrayDataByMonth[$i]['pause_hours_1'] = $hours;
				$this->hoursByMoth+=$hours;

			}

			if($array[$i]['from_2']!=null && $array[$i]['to_2']!=null) {
				$this->arrayDataByMonth[$i]['from_2'] = $array[$i]['from_2'];
				$this->arrayDataByMonth[$i]['to_2'] = $array[$i]['to_2'];

				$time1 = strtotime($array[$i]['from_2']);
				$time2 = strtotime($array[$i]['to_2']);
				$hours = ($time1 - $time2)/60;
				$this->arrayDataByMonth[$i]['hours_2'] = $hours;
				$this->hoursByMoth+=$hours;

			}

			if($array[$i]['from_2']!=null && $array[$i]['to_2']!=null) {
				$this->arrayDataByMonth[$i]['from_3'] = $array[$i]['from_3'];
				$this->arrayDataByMonth[$i]['to_3'] = $array[$i]['to_3'];

				$time1 = strtotime($array[$i]['from_3']);
				$time2 = strtotime($array[$i]['to_3']);
				$hours = ($time1 - $time2)/60;
				$this->arrayDataByMonth[$i]['hours_3'] = $hours;
				$this->hoursByMoth+=$hours;
			}

			if($array[$i]['is_nemoc']==1){
				$this->arrayDataByMonth[$i]['note1'] = "nemoc";
				$this->diseasesHoursByMoth+=8;///!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			if($array[$i]['is_vacation']==1){
				$this->arrayDataByMonth[$i]['note1'] = "dovolená";
			}

			$this->arrayDataByMonth[$i]['note2'] = $array[$i]['other'];

		}
		$this->arrayDataByMonth;
	}

	function getMonthData(){
		return $this->arrayDataByMonth;
	}

	function printDataUser(){
		return $this->nameAndLastName;
	}

}