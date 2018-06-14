<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:17
 */

include_once (__DIR__."/../database/Database.php");
include_once (__DIR__."/BaseModel.php");

class UserHoliday extends BaseModel
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var DateTime
     */
    private $day = "";
    /**
     * @var string
     */
    private $type = "";

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
    public function getDay()
    {
        return $this->day;
    }

    /**
     * @param string $day
     */
    public function setDay($day)
    {
        $this->day = $day;
    }

    /**
     * ALL_DAY
     * FIRST_PART_OF_DAY
     * SECOND_PART_OF_DAY
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setId($row["id"]);
        self::setUserId($row["user_id"]);
        self::setDay($row["day"]);
        self::setType($row["type"]);
    }

    /**
     * @param int $id
     * @return UserHoliday
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user_holiday WHERE id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

	/**
	 * @param int $id
	 */
	static function deleteById($id){
	    $query = "DELETE FROM user_holiday WHERE id = :id;";
	    $preparedQuery = Database::getConnection()->prepare($query);
	    $preparedQuery->bindValue(":id", $id);
	    $preparedQuery->execute();
    }

	/**
	 * @param int $id
	 */
	static function findByUserId($id){
		$query = "SELECT * FROM user_holiday WHERE user_id = :id;";
		$preparedQuery = Database::getConnection()->prepare($query);
		$preparedQuery->bindValue(":id", $id);
		$preparedQuery->execute();
		$result = $preparedQuery->fetch();

		$instance = new self();
		$instance->fill($result);

	}

	/**
	 * @param int $id
	 * @param int $year
	 * @return UserHoliday[]
	 */
	static function findAllByUserIdAndYear($id, $year){
		$query = "SELECT * FROM user_holiday WHERE user_id = :id AND YEAR(day) =:year;";
		$preparedQuery = Database::getConnection()->prepare($query);
		$preparedQuery->bindValue(":id", $id);
		$preparedQuery->bindValue(":year", $year);
		$preparedQuery->execute();
		$result = $preparedQuery->fetchAll();

		$arrayOfUserHoliday = array();

		foreach ($result as $var) {
			$instance = new self();
			$instance->fill($var);
			$arrayOfUserHoliday[] = $instance;

		}
		return $arrayOfUserHoliday;
	}

	/**
	 * @param int $id
	 * @param int $year
	 * @param int $month
	 * @return UserHoliday[]
	 */
	static function findAllByUserIdAndMonthAndYear($id, $year, $month){
		$query = "SELECT * FROM user_holiday WHERE user_id = :id AND YEAR(day) =:year AND MONTH(day) =:month ORDER BY day;";
		$preparedQuery = Database::getConnection()->prepare($query);
		$preparedQuery->bindValue(":id", $id);
		$preparedQuery->bindValue(":year", $year);
		$preparedQuery->bindValue(":month", $month);
		$preparedQuery->execute();
		$result = $preparedQuery->fetchAll();

		$arrayOfUserHoliday = array();

		foreach ($result as $var) {
			$instance = new self();
			$instance->fill($var);
			$arrayOfUserHoliday[] = $instance;
		}
		return $arrayOfUserHoliday;
	}

    /**
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM user_holiday;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUserHoliday = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUserHoliday[] = $instance;

        }
        return $arrayOfUserHoliday;
    }

    /**
     * @param UserHoliday $userHoliday
     */
    static function save($userHoliday)
    {
        $query = "insert into user_holiday (id, user_id, day, type) value (:id, :user_id, :day, :type) on duplicate key update user_id = :user_id, day = :day, type = :type;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $userHoliday->getId() == -1 ? null : $userHoliday->getId());
        $preparedQuery->bindValue(":user_id", $userHoliday->getUserId());
        $preparedQuery->bindValue(":day", $userHoliday->getDay());
        $preparedQuery->bindValue(":type", $userHoliday->getType());

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