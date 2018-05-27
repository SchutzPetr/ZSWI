<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:18
 */

class DayTimeSheet extends BaseModel
{
    private $userId = -1;           //TODO Nastavit cizí klíč, pokud je zde -1 je porušena integrita databáze.
    private $date = "";
    private $dayType = "";
    private $firstPartFrom = "";
    private $firstPartTo = "";
    private $secondPartFrom = "";
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
     * @return string
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param string $date
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
     * @return string
     */
    public function getFirstPartFrom()
    {
        return $this->firstPartFrom;
    }

    /**
     * @param string $firstPartFrom
     */
    public function setFirstPartFrom($firstPartFrom)
    {
        $this->firstPartFrom = $firstPartFrom;
    }

    /**
     * @return string
     */
    public function getFirstPartTo()
    {
        return $this->firstPartTo;
    }

    /**
     * @param string $firstPartTo
     */
    public function setFirstPartTo($firstPartTo)
    {
        $this->firstPartTo = $firstPartTo;
    }

    /**
     * @return string
     */
    public function getSecondPartFrom()
    {
        return $this->secondPartFrom;
    }

    /**
     * @param string $secondPartFrom
     */
    public function setSecondPartFrom($secondPartFrom)
    {
        $this->secondPartFrom = $secondPartFrom;
    }

    /**
     * @return string
     */
    public function getSecondPartTo()
    {
        return $this->secondPartTo;
    }

    /**
     * @param string $secondPartTo
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
     * @param $id
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

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfDayTimeSheets[] = $instance;

        }
        return $arrayOfDayTimeSheets;
    }

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
}