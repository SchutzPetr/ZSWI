<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:18
 */

include_once (__DIR__."/../database/Database.php");

class DayTimeSheet implements JsonSerializable
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var string
     */
    private $date = "";
    /**
     * @var string|null
     */
    private $dayType = "";
    /**
     * @var string|null
     */
    private $firstPartFrom = "";
    /**
     * @var string|null
     */
    private $firstPartTo = "";
    /**
     * @var string|null
     */
    private $secondPartFrom = "";
    /**
     * @var string|null
     */
    private $secondPartTo = "";

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     */
    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * @param string $date
     */
    public function setDate(string $date): void
    {
        $this->date = $date;
    }

    /**
     * @return null|string
     */
    public function getDayType(): ?string
    {
        return $this->dayType;
    }

    /**
     * @param null|string $dayType
     */
    public function setDayType(?string $dayType): void
    {
        $this->dayType = $dayType;
    }

    /**
     * @return null|string
     */
    public function getFirstPartFrom(): ?string
    {
        return $this->firstPartFrom;
    }

    /**
     * @param null|string $firstPartFrom
     */
    public function setFirstPartFrom(?string $firstPartFrom): void
    {
        $this->firstPartFrom = $firstPartFrom;
    }

    /**
     * @return null|string
     */
    public function getFirstPartTo(): ?string
    {
        return $this->firstPartTo;
    }

    /**
     * @param null|string $firstPartTo
     */
    public function setFirstPartTo(?string $firstPartTo): void
    {
        $this->firstPartTo = $firstPartTo;
    }

    /**
     * @return null|string
     */
    public function getSecondPartFrom(): ?string
    {
        return $this->secondPartFrom;
    }

    /**
     * @param null|string $secondPartFrom
     */
    public function setSecondPartFrom(?string $secondPartFrom): void
    {
        $this->secondPartFrom = $secondPartFrom;
    }

    /**
     * @return null|string
     */
    public function getSecondPartTo(): ?string
    {
        return $this->secondPartTo;
    }

    /**
     * @param null|string $secondPartTo
     */
    public function setSecondPartTo(?string $secondPartTo): void
    {
        $this->secondPartTo = $secondPartTo;
    }


    /**
     * @param $row
     */
    private function fill($row)
    {
    	if($row["user_id"] != null){
		    self::setUserId($row["user_id"]);
		    self::setDate($row["date"]);
		    self::setDayType($row["day_type"]);
		    self::setFirstPartFrom($row["first_part_from"]);
		    self::setFirstPartTo($row["first_part_to"]);
		    self::setSecondPartFrom($row["second_part_from"]);
		    self::setSecondPartTo($row["second_part_to"]);
	    }
    }

    /**
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM day_time_sheet;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfDayTimeSheets = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfDayTimeSheets[] = $instance;

        }
        return $arrayOfDayTimeSheets;
    }

    /**
     * @param $userId integer
     * @param $month integer
     * @param $year integer
     * @return DayTimeSheet[]
     */
    static function findAllByUserIdAndYearAndMonth($userId, $month, $year)
    {
        $query = "SELECT * FROM day_time_sheet WHERE user_id = :user_id and YEAR(date) = :year AND MONTH(date) = :month;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":month", $month);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfDayTimeSheets = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfDayTimeSheets[date('d', strtotime($instance->getDate()))] = $instance;

        }
        return $arrayOfDayTimeSheets;
    }

    static function findByUserIdAndDate($userId, $day, $month, $year){
    	$date = DateTime::createFromFormat("Y-m-d", $year."-".$month."-".$day);
	    $query = "SELECT * FROM day_time_sheet WHERE user_id = :user_id and date=:date;";
	    $preparedQuery = Database::getConnection()->prepare($query);
	    $preparedQuery->bindValue(":user_id", $userId);
	    $preparedQuery->bindValue(":date", $date->format("Y-m-d"));
	    $preparedQuery->execute();
	    $result = $preparedQuery->fetch();

	    $instance = new self();
	    $instance->fill($result);

	    return $instance;

    }

    /**
     * @param DayTimeSheet $dayTimeSheet
     */
    static function save($dayTimeSheet)
    {
        $query = "insert into day_time_sheet (user_id, date, first_part_from, first_part_to, second_part_from, second_part_to, day_type) value (:user_id, :date, :first_part_from, :first_part_to, :second_part_from, :second_part_to, :day_type) on duplicate key update first_part_from = :first_part_from, first_part_to = :first_part_to, second_part_from = :second_part_from, second_part_to = :second_part_to, day_type = :day_type;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $dayTimeSheet->getUserId());
        $preparedQuery->bindValue(":date", $dayTimeSheet->getDate());
        $preparedQuery->bindValue(":first_part_from", $dayTimeSheet->getFirstPartFrom());
        $preparedQuery->bindValue(":first_part_to", $dayTimeSheet->getFirstPartTo());
        $preparedQuery->bindValue(":second_part_from", $dayTimeSheet->getSecondPartFrom());
        $preparedQuery->bindValue(":second_part_to", $dayTimeSheet->getSecondPartTo());
        $preparedQuery->bindValue(":day_type", $dayTimeSheet->getDayType());
        echo $dayTimeSheet->getDayType();

        $preparedQuery->execute();
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
        $array = array();
        $array = array_merge($array, get_object_vars($this));
        return $array;
    }
}