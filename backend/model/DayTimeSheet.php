<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:18
 */

include_once (__DIR__."../database/Database.php");
include_once (__DIR__."BaseModel.php");

class DayTimeSheet extends BaseModel
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var DateTime
     */
    private $date = "";
    /**
     * @var string
     */
    private $dayType = "";
    /**
     * @var DateTime
     */
    private $firstPartFrom = "";
    /**
     * @var DateTime
     */
    private $firstPartTo = "";
    /**
     * @var DateTime
     */
    private $secondPartFrom = "";
    /**
     * @var DateTime
     */
    private $secondPartTo = "";


    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    /**
     * @return DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param DateTime $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return string
     */
    public function getDayType()
    {
        return $this->dayType;
    }

    /**
     * @param string $dayType
     */
    public function setDayType($dayType)
    {
        $this->dayType = $dayType;
    }

    /**
     * @return DateTime
     */
    public function getFirstPartFrom()
    {
        return $this->firstPartFrom;
    }

    /**
     * @param DateTime $firstPartFrom
     */
    public function setFirstPartFrom($firstPartFrom)
    {
        $this->firstPartFrom = $firstPartFrom;
    }

    /**
     * @return DateTime
     */
    public function getFirstPartTo()
    {
        return $this->firstPartTo;
    }

    /**
     * @param DateTime $firstPartTo
     */
    public function setFirstPartTo($firstPartTo)
    {
        $this->firstPartTo = $firstPartTo;
    }

    /**
     * @return DateTime
     */
    public function getSecondPartFrom()
    {
        return $this->secondPartFrom;
    }

    /**
     * @param DateTime $secondPartFrom
     */
    public function setSecondPartFrom($secondPartFrom)
    {
        $this->secondPartFrom = $secondPartFrom;
    }

    /**
     * @return DateTime
     */
    public function getSecondPartTo()
    {
        return $this->secondPartTo;
    }

    /**
     * @param DateTime $secondPartTo
     */
    public function setSecondPartTo($secondPartTo)
    {
        $this->secondPartTo = $secondPartTo;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setUserId($row["user_id"]);
        self::setId($row["id"]);
        self::setDate($row["date"]);
        self::setDayType($row["day_type"]);
        self::setFirstPartFrom($row["first_part_from"]);
        self::setFirstPartTo($row["first_part_to"]);
        self::setSecondPartFrom($row["second_part_from"]);
        self::setSecondPartTo($row["second_part_to"]);
    }

    /**
     * @param int $id
     * @return DayTimeSheet
     */
    static function findById($id)
    {
        $query = "SELECT * FROM day_time_sheet WHERE id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
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
     * @param DayTimeSheet $dayTimeSheet
     */
    static function save($dayTimeSheet)
    {
        $query = "insert into day_time_sheet (id, user_id, date, first_part_from, first_part_to, second_part_from, second_part_to, day_type) value (:id, :user_id, :date, :first_part_from, :first_part_to, :second_part_from, :second_part_to, :day_type) on duplicate key update user_id = :user_id, date = :date, first_part_from = :first_part_from, first_part_to = :first_part_to, second_part_from = :second_part_from, second_part_to = :second_part_to, day_type = :day_type;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $dayTimeSheet->getId() == -1 ? null : $dayTimeSheet->getId());
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
        $array["id"] = $this->getId();
        $array = array_merge($array, get_object_vars($this));
        return $array;
    }
}