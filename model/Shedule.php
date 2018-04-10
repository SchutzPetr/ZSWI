<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 10.04.2018
 * Time: 8:10
 */

class Shedule {

	protected $_id;
	protected $_userId;
	protected $_date;
	protected $_dayType;
	protected $_firstPartFrom;
	protected $_firstPartTo;
	protected $_secondPartFrom;
	protected $_secondPartTo;
	protected $_thirdPartFrom;
	protected $_thirdPartTo;

	function __construct() {
		$this->_id="";
		$this->_userId="";
		$this->_date="";
		$this->_firstPartFrom="";
		$this->_firstPartTo="";
		$this->_secondPartFrom="";
		$this->_secondPartTo="";
		$this->_thirdPartFrom="";
		$this->_thirdPartTo="";
	}

	/**
	 * @return mixed
	 */
	public function getDayType() {
		return $this->_dayType;
	}

	/**
	 * @param mixed $dayType
	 */
	public function setDayType( $dayType ) {
		$this->_dayType = $dayType;
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
	public function getUserId() {
		return $this->_userId;
	}

	/**
	 * @param string $userId
	 */
	public function setUserId( $userId ) {
		$this->_userId = $userId;
	}

	/**
	 * @return string
	 */
	public function getDate() {
		return $this->_date;
	}

	/**
	 * @param string $date
	 */
	public function setDate( $date ) {
		$this->_date = $date;
	}

	/**
	 * @return string
	 */
	public function getFirstPartFrom() {
		return $this->_firstPartFrom;
	}

	/**
	 * @param string $firstPartFrom
	 */
	public function setFirstPartFrom( $firstPartFrom ) {
		$this->_firstPartFrom = $firstPartFrom;
	}

	/**
	 * @return string
	 */
	public function getFirstPartTo() {
		return $this->_firstPartTo;
	}

	/**
	 * @param string $firstPartTo
	 */
	public function setFirstPartTo( $firstPartTo ) {
		$this->_firstPartTo = $firstPartTo;
	}

	/**
	 * @return string
	 */
	public function getSecondPartFrom() {
		return $this->_secondPartFrom;
	}

	/**
	 * @param string $secondPartFrom
	 */
	public function setSecondPartFrom( $secondPartFrom ) {
		$this->_secondPartFrom = $secondPartFrom;
	}

	/**
	 * @return string
	 */
	public function getSecondPartTo() {
		return $this->_secondPartTo;
	}

	/**
	 * @param string $secondPartTo
	 */
	public function setSecondPartTo( $secondPartTo ) {
		$this->_secondPartTo = $secondPartTo;
	}

	/**
	 * @return string
	 */
	public function getThirdPartFrom() {
		return $this->_thirdPartFrom;
	}

	/**
	 * @param string $thirdPartFrom
	 */
	public function setThirdPartFrom( $thirdPartFrom ) {
		$this->_thirdPartFrom = $thirdPartFrom;
	}

	/**
	 * @return string
	 */
	public function getThirdPartTo() {
		return $this->_thirdPartTo;
	}

	/**
	 * @param string $thirdPartTo
	 */
	public function setThirdPartTo( $thirdPartTo ) {
		$this->_thirdPartTo = $thirdPartTo;
	}



}