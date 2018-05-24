<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:18
 */

class DayTimeSheet extends BaseModel
{
    private $date = "";
    private $dayType = "";
    private $firstPartFrom = "";
    private $firstPartTo = "";
    private $secondPartFrom = "";
    private $secondPartTo = "";

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
        self::setDate($row["date"]);
        self::setDayType($row["day_type"]);
        self::setFirstPartFrom($row("first_part_from"));
        self::setFirstPartTo($row("first_part_to"));
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
}