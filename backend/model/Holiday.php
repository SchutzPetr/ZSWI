<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 14.06.2018
 * Time: 21:43
 */
include_once(__DIR__ . "/../database/Database.php");
include_once(__DIR__ . "/BaseModel.php");

class Holiday extends BaseModel
{


    /**
     * @var DateTime
     */
    private $day = "";
    /**
     * @var string
     */
    private $name = "";


    /**
     * @return DateTime
     */
    public function getDay()
    {
        return $this->day;
    }

    /**
     * @param DateTime $day
     */
    public function setDay($day)
    {
        $this->day = $day;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setId($row["id"]);
        self::setDay($row["day"]);
        self::setName($row["name"]);
    }


    /**
     * @param int $id
     * @return Holiday
     */
    static function findById($id)
    {
        $query = "SELECT * FROM holiday WHERE id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param int $year
     * @param int $month
     * @param int $day
     */
    static function deleteByDay($year, $month, $day)
    {
        $query = "DELETE FROM holiday WHERE YEAR(day) =:year AND MONTH(day) =:month AND DAY(day)=:day;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":month", $month);
        $preparedQuery->bindValue(":day", $day);
        $preparedQuery->execute();
    }

    /**
     * @param int $year
     * @param int $month
     * @return Holiday[]
     */
    static function findAllByMonthAndYear($year, $month)
    {
        $query = "SELECT * FROM holiday WHERE YEAR(day) =:year AND MONTH(day) =:month ORDER BY day;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":month", $month);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfHoliday = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfHoliday[] = $instance;
        }
        return $arrayOfHoliday;
    }

    /**
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM holiday;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfHoliday = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfHoliday[] = $instance;

        }
        return $arrayOfHoliday;
    }

    static function findByYearMonthAndDay($year, $month, $day)
    {
        $query = "SELECT * FROM holiday WHERE YEAR(day) =:year AND MONTH(day) =:month AND DAY(day)=:day;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":month", $month);
        $preparedQuery->bindValue(":day", $day);

        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        if(empty($result)){
            return null;
        }

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param Holiday $holiday
     */
    static function save($holiday)
    {
        $query = "insert into holiday (id, day, name) value (:id, :day, :name) on duplicate key update id = :id, day = :day, name = :name;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $holiday->getId() == -1 ? null : $holiday->getId());
        $preparedQuery->bindValue(":day", $holiday->getDay());
        $preparedQuery->bindValue(":name", $holiday->getName());

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