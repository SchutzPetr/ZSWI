<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 21.03.2018
 * Time: 18:43
 */
include_once("constant.php");

class User {

	protected $_nameAndLastName;

	protected $_id;
	protected $_name;
	protected $_lastName;
	protected $_email;
	protected $_honorificPrefix;
	protected $_honorificSuffix;
	protected $_authority;
	protected $_active;
	protected $_mainWorkStation;
	protected $_contract;
	protected $_vacationHourByContract;
	protected $_vacationHourByYear;

	protected $_arrayDataByMonth;
	protected $_vacations;
	protected $_hoursByMoth;
	protected $_vacationsHoursByMoth;
	protected $_diseasesHoursByMoth;

	function __construct() {
		$this->_id = "";
		$this->_nameAndLastName = "";
		$this->_name = "";
		$this->_lastName = "";
		$this->_email = "";
		$this->_honorificPrefix = "";
		$this->_honorificSuffix = "";
		$this->_authority = "";
		$this->_active = true;
		$this->_mainWorkStation = "";
		$this->_contract = 1;
		$this->_vacationHourByContract = FULLTIME_VACATIONS_DAY;
		$this->_vacationHourByYear = 0;


		$this->_arrayDataByMonth = [];
		$this->_vacations = [];
		$this->_vacationsHoursByMoth = 0;
		$this->_diseasesHoursByMoth = 0;
	}

	function fill($array){
		$this->_id = $array["id"];
		$this->setName($array);
		$this->_authority = $array['authority'];
		$this->_active = $this->setActive($array['is_active']);
	}

	/**
	 * @return string
	 */
	public function getId() {
		return $this->_id;
	}

	/**
	 * @param string $id
	 */
	public function setId( $id ) {
		$this->_id = $id;
	}


	/**
	 * @return string
	 */
	public function getNameAndLastName() {
		return $this->_nameAndLastName;
	}

	/**
	 * @param string $nameAndLastName
	 */
	public function setNameAndLastName( $nameAndLastName ) {
		$this->_nameAndLastName = $nameAndLastName;
	}

	/**
	 * @return string
	 */
	public function getLastName() {
		return $this->_lastName;
	}

	/**
	 * @param string $lastName
	 */
	public function setLastName( $lastName ) {
		$this->_lastName = $lastName;
	}

	/**
	 * @return string
	 */
	public function getEmail() {
		return $this->_email;
	}

	/**
	 * @param string $email
	 */
	public function setEmail( $email ) {
		$this->_email = $email;
	}

	/**
	 * @return string
	 */
	public function getHonorificPrefix() {
		return $this->_honorificPrefix;
	}

	/**
	 * @param string $honorificPrefix
	 */
	public function setHonorificPrefix( $honorificPrefix ) {
		$this->_honorificPrefix = $honorificPrefix;
	}

	/**
	 * @return string
	 */
	public function getHonorificSuffix() {
		return $this->_honorificSuffix;
	}

	/**
	 * @param string $honorificSuffix
	 */
	public function setHonorificSuffix( $honorificSuffix ) {
		$this->_honorificSuffix = $honorificSuffix;
	}

	/**
	 * @return string
	 */
	public function getAuthority() {
		return $this->_authority;
	}

	/**
	 * @param string $authority
	 */
	public function setAuthority( $authority ) {
		$this->_authority = $authority;
	}

	/**
	 * @return string
	 */
	public function getMainWorkStation() {
		return $this->_mainWorkStation;
	}

	/**
	 * @param string $mainWorkStation
	 */
	public function setMainWorkStation( $mainWorkStation ) {
		$this->_mainWorkStation = $mainWorkStation;
	}

	/**
	 * @return int
	 */
	public function getContract() {
		return $this->_contract;
	}

	/**
	 * @param int $contract
	 */
	public function setContract( $contract ) {
		$this->_vacationHourByContract = FULLTIME_VACATIONS_DAY*$contract;
		$this->_contract = $contract;
	}

	/**
	 * @return int
	 */
	public function getVacationHourByContract() {
		return $this->_vacationHourByContract;
	}

	/**
	 * @param int $vacationHourByContract
	 */
	public function setVacationHourByContract( $vacationHourByContract ) {
		$this->_vacationHourByContract = $vacationHourByContract;
	}

	/**
	 * @return int
	 */
	public function getVacationHourByYear() {
		return $this->_vacationHourByYear;
	}

	/**
	 * @param int $vacationHourByYear
	 */
	public function setVacationHourByYear( $vacationHourByYear ) {
		$this->_vacationHourByYear = $vacationHourByYear;
	}

	/**
	 * @return array
	 */
	public function getArrayDataByMonth() {
		return $this->_arrayDataByMonth;
	}

	/**
	 * @param array $arrayDataByMonth
	 */
	public function setArrayDataByMonth( $arrayDataByMonth ) {
		$this->_arrayDataByMonth = $arrayDataByMonth;
	}

	/**
	 * @return array
	 */
	public function getVacations() {
		return $this->_vacations;
	}

	/**
	 * @param array $vacations
	 */
	public function setVacations( $vacations ) {
		$this->_vacations = $vacations;
	}

	/**
	 * @return mixed
	 */
	public function getHoursByMoth() {
		return $this->_hoursByMoth;
	}

	/**
	 * @param mixed $hoursByMoth
	 */
	public function setHoursByMoth( $hoursByMoth ) {
		$this->_hoursByMoth = $hoursByMoth;
	}

	/**
	 * @return int
	 */
	public function getVacationsHoursByMoth() {
		return $this->_vacationsHoursByMoth;
	}

	/**
	 * @param int $vacationsHoursByMoth
	 */
	public function setVacationsHoursByMoth( $vacationsHoursByMoth ) {
		$this->_vacationsHoursByMoth = $vacationsHoursByMoth;
	}

	/**
	 * @return int
	 */
	public function getDiseasesHoursByMoth() {
		return $this->_diseasesHoursByMoth;
	}

	/**
	 * @param int $diseasesHoursByMoth
	 */
	public function setDiseasesHoursByMoth( $diseasesHoursByMoth ) {
		$this->_diseasesHoursByMoth = $diseasesHoursByMoth;
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
//            echo '<pre>'; print_r($array); echo '</pre>';
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
		for($i =0; $i<count($array); $i++){
			$date=date_create($array[$i]['day']);

			$this->_arrayDataByMonth[$i]['day'] = date_format($date,"d.m.Y");
			$this->_arrayDataByMonth[$i]['day_of_week'] = $date->format('N');

			if($array[$i]['from_1']!=null && $array[$i]['to_1']!=null){
				$this->_arrayDataByMonth[$i]['from_1'] = $array[$i]['from_1'];
				$this->_arrayDataByMonth[$i]['to_1'] = $array[$i]['to_1'];

				$time1 = $array[$i]['from_1'];
				$time2 = $array[$i]['to_1'];
				$hours = number_format(($time2 - $time1),2);
				$this->_arrayDataByMonth[$i]['hours_1'] = $hours;
				$this->_hoursByMoth+=$hours;

			}
			if($array[$i]['from_2']!=null && $array[$i]['to_1']!=null){
				$this->_arrayDataByMonth[$i]['pause_from_1'] = $array[$i]['to_1'];
				$this->_arrayDataByMonth[$i]['pause_to_1'] = $array[$i]['from_2'];

				$time1 = $array[$i]['to_1'];
				$time2 = $array[$i]['from_2'];
				$hours = number_format(($time2 - $time1),2);
				$this->_arrayDataByMonth[$i]['pause_hours_1'] = $hours;
				$this->_hoursByMoth+=$hours;

			}

			if($array[$i]['from_2']!=null && $array[$i]['to_2']!=null) {
				$this->_arrayDataByMonth[$i]['from_2'] = $array[$i]['from_2'];
				$this->_arrayDataByMonth[$i]['to_2'] = $array[$i]['to_2'];

				$time1 = $array[$i]['from_2'];
				$time2 = $array[$i]['to_2'];
				$hours = number_format(($time2 - $time1),2);
				$this->_arrayDataByMonth[$i]['hours_2'] = $hours;
				$this->_hoursByMoth+=$hours;

			}

			if($array[$i]['from_3']!=null && $array[$i]['to_3']!=null) {
				$this->_arrayDataByMonth[$i]['from_3'] = $array[$i]['from_3'];
				$this->_arrayDataByMonth[$i]['to_3'] = $array[$i]['to_3'];

				$time1 = $array[$i]['from_3'];
				$time2 = $array[$i]['to_3'];
				$hours = number_format(($time2 - $time1),2);

				$this->_arrayDataByMonth[$i]['hours_3'] = $hours;
				$this->_hoursByMoth+=$hours;
			}
			$this->_arrayDataByMonth[$i]['note1'] = '';
			if($array[$i]['is_nemoc']>0){
				$this->_arrayDataByMonth[$i]['note1'] = "nemoc";
				$this->_diseasesHoursByMoth+=8;///!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			if($array[$i]['is_vacation']>0){
				$this->_arrayDataByMonth[$i]['note1'] = "dovolená";
			}
			$this->_arrayDataByMonth[$i]['note2'] = '';
			$this->_arrayDataByMonth[$i]['note2'] = $array[$i]['other'];

		}
		$this->_arrayDataByMonth;
	}

	function getMonthData(){
		return $this->_arrayDataByMonth;
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
						"mainWorkStation"=>$this->_mainWorkStation,
						"contract"=>$this->_contract,
						"vacationHourByContract"=>$this->_vacationHourByContract,
						"vacationHourByYear"=>$this->_vacationHourByYear
			);
//		$myJSON = json_encode((array)$object);
		return $object;
	}

}