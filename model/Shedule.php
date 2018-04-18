<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 10.04.2018
 * Time: 8:10
 */

class Shedule {

	protected $id;
	protected $userId;
	protected $date;
	protected $dayType;
	protected $firstPartFrom;
	protected $firstPartTo;
	protected $secondPartFrom;
	protected $secondPartTo;
	protected $thirdPartFrom;
	protected $thirdPartTo;

	function __construct() {
		$this->id="";
		$this->userId="";
		$this->date="";
		$this->firstPartFrom="";
		$this->firstPartTo="";
		$this->secondPartFrom="";
		$this->secondPartTo="";
		$this->thirdPartFrom="";
		$this->thirdPartTo="";
	}


	public function __toString() {
		$array = array("id" =>$this->id,
			"userId" => $this->userId,
			"date" => $this->date,
			"firstPartFrom"=> $this->firstPartFrom,
			"firstPartTo" =>$this->firstPartTo,
			"secondPartFrom" =>$this->secondPartFrom,
			"secondPartTo" => $this->secondPartTo,
			"thirdPartFrom" => $this->thirdPartFrom,
			"thirdPartTo" => $this->thirdPartTo
		);
		return json_encode($array);
	}

	function getDataToForJSON(){
		$array = array("id" =>$this->id,
		               "userId" => $this->userId,
		               "date" => $this->date,
		               "firstPartFrom"=> $this->firstPartFrom,
		               "firstPartTo" =>$this->firstPartTo,
		               "secondPartFrom" =>$this->secondPartFrom,
		               "secondPartTo" => $this->secondPartTo,
		               "thirdPartFrom" => $this->thirdPartFrom,
		               "thirdPartTo" => $this->thirdPartTo
		);
		return $array;
	}

	/**
	 * @return mixed
	 */
	public function getDayType() {
		return $this->dayType;
	}

	/**
	 * @param mixed $dayType
	 */
	public function setDayType( $dayType ) {
		$this->dayType = $dayType;
	}


	/**
	 * @return string
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @param string $id
	 */
	public function setId( $id ) {
		$this->id = $id;
	}

	/**
	 * @return string
	 */
	public function getUserId() {
		return $this->userId;
	}

	/**
	 * @param string $userId
	 */
	public function setUserId( $userId ) {
		$this->userId = $userId;
	}

	/**
	 * @return string
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @param string $date
	 */
	public function setDate( $date ) {
		$this->date = $date;
	}

	/**
	 * @return string
	 */
	public function getFirstPartFrom() {
		return $this->firstPartFrom;
	}

	/**
	 * @param string $firstPartFrom
	 */
	public function setFirstPartFrom( $firstPartFrom ) {
		$this->firstPartFrom = $firstPartFrom;
	}

	/**
	 * @return string
	 */
	public function getFirstPartTo() {
		return $this->firstPartTo;
	}

	/**
	 * @param string $firstPartTo
	 */
	public function setFirstPartTo( $firstPartTo ) {
		$this->firstPartTo = $firstPartTo;
	}

	/**
	 * @return string
	 */
	public function getSecondPartFrom() {
		return $this->secondPartFrom;
	}

	/**
	 * @param string $secondPartFrom
	 */
	public function setSecondPartFrom( $secondPartFrom ) {
		$this->secondPartFrom = $secondPartFrom;
	}

	/**
	 * @return string
	 */
	public function getSecondPartTo() {
		return $this->secondPartTo;
	}

	/**
	 * @param string $secondPartTo
	 */
	public function setSecondPartTo( $secondPartTo ) {
		$this->secondPartTo = $secondPartTo;
	}

	/**
	 * @return string
	 */
	public function getThirdPartFrom() {
		return $this->thirdPartFrom;
	}

	/**
	 * @param string $thirdPartFrom
	 */
	public function setThirdPartFrom( $thirdPartFrom ) {
		$this->thirdPartFrom = $thirdPartFrom;
	}

	/**
	 * @return string
	 */
	public function getThirdPartTo() {
		return $this->thirdPartTo;
	}

	/**
	 * @param string $thirdPartTo
	 */
	public function setThirdPartTo( $thirdPartTo ) {
		$this->thirdPartTo = $thirdPartTo;
	}



}