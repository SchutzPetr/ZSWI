<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 12.06.2018
 * Time: 22:33
 */

include_once ( __DIR__ . "/../../../model/DayTimeSheet.php" );

class TimeSheet implements JsonSerializable
{
    /**
     * @var DayTimeSheet[]
     */
    private $dayTimeSheets = [];

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
    public function getDayTimeSheets(): array
    {
        return $this->dayTimeSheets;
    }

    /**
     * @param DayTimeSheet[] $dayTimeSheets
     */
    public function setDayTimeSheets(array $dayTimeSheets): void
    {
        $this->dayTimeSheets = $dayTimeSheets;
    }

    /**
     * @return int
     */
    public function getMonth(): int
    {
        return $this->month;
    }

    /**
     * @param int $month
     */
    public function setMonth(int $month): void
    {
        $this->month = $month;
    }

    /**
     * @return int
     */
    public function getYear(): int
    {
        return $this->year;
    }

    /**
     * @param int $year
     */
    public function setYear(int $year): void
    {
        $this->year = $year;
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