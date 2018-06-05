<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:35
 */

include_once (__DIR__."/../database/Database.php");
include_once (__DIR__."/BaseModel.php");

class Attendance extends BaseModel
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var string
     */
    private $activeFrom = "";
    /**
     * @var string
     */
    private $firstPartFrom = "";
    /**
     * @var string
     */
    private $firstPartTo = "";
    /**
     * @var string
     */
    private $secondPartFrom = "";
    /**
     * @var string
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
        self::setId($row["id"]);
        self::setUserId($row["user_id"]);
        self::setActiveFrom($row["active_from"]);
        self::setFirstPartFrom($row["first_part_from"]);
        self::setFirstPartTo($row["first_part_to"]);
        self::setSecondPartFrom($row["second_part_from"]);
        self::setSecondPartTo($row["second_part_to"]);
    }

    /**
     * @param int $id
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
     * @param int $userId
     * @return Attendance
     */
    static function findLastByUserId($userId)
    {
        $query = "SELECT * FROM attendance WHERE user_id = :user_id ORDER BY active_from DESC LIMIT 1;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @return Attendance[]
     */
    static function findAll()
    {
        $query = "SELECT * FROM attendance;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfAttendances = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfAttendances[] = $instance;

        }
        return $arrayOfAttendances;
    }

    /**
     * @param int $userId
     * @return Attendance[]
     */
    static function findAllByUserId($userId)
    {
        $query = "SELECT * FROM attendance WHERE user_id = :user_id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfAttendances = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfAttendances[] = $instance;

        }
        return $arrayOfAttendances;

    }

    /**
     * @param Attendance $attendance
     */
    static function save($attendance)
    {
        $query = "insert into attendance (id, user_id, active_from, first_part_from, first_part_to, second_part_from, second_part_to ) value (:id, :user_id, :active_from, :first_part_from, :first_part_to, :second_part_from, :second_part_to ) on duplicate key update user_id = :user_id, active_from = :active_from, first_part_from = :first_part_from, first_part_to = :first_part_to, second_part_from = :second_part_from, second_part_to = :second_part_to ;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $attendance->getId() == -1 ? null : $attendance->getId());
        $preparedQuery->bindValue(":user_id", $attendance->getUserId());
        $preparedQuery->bindValue(":active_from", $attendance->getActiveFrom() == "" ? null : $attendance->getActiveFrom());
        $preparedQuery->bindValue(":first_part_from", $attendance->getFirstPartFrom());
        $preparedQuery->bindValue(":first_part_to", $attendance->getFirstPartTo());
        $preparedQuery->bindValue(":second_part_from", $attendance->getSecondPartFrom());
        $preparedQuery->bindValue(":second_part_to", $attendance->getSecondPartTo());

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