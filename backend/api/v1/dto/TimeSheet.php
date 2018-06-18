<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 12.06.2018
 * Time: 22:33
 */

include_once(__DIR__ . "/../../../model/DayTimeSheet.php");
include_once(__DIR__ . "/../../../model/ProjectAssign.php");
include_once(__DIR__ . "/../../../model/Holiday.php");


class TimeSheet implements JsonSerializable
{
    /**
     * @var DayTimeSheet[]
     */
    private $dayTimeSheets = [];

	/**
	 * @var ProjectAssign[]
	 */
    private $projectAssign = [];

    /**
     * @var Holiday[]
     */
    private $publicHolidays = [];

    /**
     * @var int
     */
    private $year = 0;

    /**
     * @var int
     */
    private $month = 0;

    /**
     * @return DayTimeSheet[]
     */
    public function getDayTimeSheets()
    {
        return $this->dayTimeSheets;
    }

    /**
     * @param DayTimeSheet[] $dayTimeSheets
     */
    public function setDayTimeSheets($dayTimeSheets)
    {
        $this->dayTimeSheets = $dayTimeSheets;
    }

    /**
     * @return int
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param int $year
     */
    public function setYear($year)
    {
        $this->year = $year;
    }

    /**
     * @return int
     */
    public function getMonth()
    {
        return $this->month;
    }

    /**
     * @param int $month
     */
    public function setMonth($month)
    {
        $this->month = $month;
    }

	/**
	 * @return ProjectAssign[]
	 */
	public function getProjectAssign() {
		return $this->projectAssign;
	}

	/**
	 * @param ProjectAssign[] $projectAssign
	 */
	public function setProjectAssign( $projectAssign ) {
		$this->projectAssign = $projectAssign;
	}

    /**
     * @return Holiday[]
     */
    public function getPublicHolidays()
    {
        return $this->publicHolidays;
    }

    /**
     * @param Holiday[] $publicHolidays
     */
    public function setPublicHolidays($publicHolidays)
    {
        $this->publicHolidays = $publicHolidays;
    }


    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        $result = get_object_vars($this);
        //$result["dayTimeSheets"] = array_values($this->getDayTimeSheets());
        return $result;
    }
}