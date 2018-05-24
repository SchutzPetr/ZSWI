<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:35
 */

class Attendance extends BaseModel
{
    private $activeFrom = "";
    private $firstPartFrom = "";
    private $firstPartTo = "";
    private $secondPartFrom = "";
    private $secondPartTo = "";

    /**
     * @return string
     */
    public function getActiveFrom()
    {
        return $this->activeFrom;
    }

    /**
     * @param string $activeFrom
     */
    public function setActiveFrom($activeFrom)
    {
        $this->activeFrom = $activeFrom;
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
        self::setActiveFrom($row["active_from"]);
        self::setFirstPartFrom($row["first_part_from"]);
        self::setFirstPartTo($row["first_part_to"]);
        self::setSecondPartFrom($row["second_part_from"]);
        self::setSecondPartTo($row["second_part_to"]);
    }

    /**
     * @param $id
     * @return Attendance
     */
    static function findById($id)
    {
        $query = "SELECT * FROM attendance WHERE id = :id;";
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
        $query = "SELECT * FROM attendance;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfAttendances[] = $instance;

        }
        return $arrayOfAttendances;
    }
}