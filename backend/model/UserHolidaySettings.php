<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:17
 */

include_once(__DIR__ . "/../database/Database.php");

class UserHolidaySettings implements JsonSerializable
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var string
     */
    private $year = 2018;

    /**
     * @var string
     */
    private $days = 0;

    /**
     * @var int
     */
    private $exhausted = 0;

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
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param string $year
     */
    public function setYear($year)
    {
        $this->year = $year;
    }

    /**
     * @return string
     */
    public function getDays()
    {
        return $this->days;
    }

    /**
     * @param string $days
     */
    public function setDays($days)
    {
        $this->days = $days;
    }

    /**
     * @return int
     */
    public function getExhausted()
    {
        return $this->exhausted;
    }

    /**
     * @param int $exhausted
     */
    public function setExhausted($exhausted)
    {
        $this->exhausted = $exhausted;
    }



    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setUserId($row["user_id"]);
        self::setYear($row["year"]);
        self::setDays($row["days"]);
    }


    /**
     * @param int $user_id
     * @return UserHolidaySettings[]
     */
    static function findByUserId($user_id)
    {
        $query = "SELECT * FROM user_holiday_settings WHERE user_id = :user_id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $user_id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUserHolidaySettings = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUserHolidaySettings[] = $instance;

        }
        return $arrayOfUserHolidaySettings;
    }

    /**
     * @param integer $user_id
     * @param integer $year
     * @param integer $value
     */
    static function increment($user_id, $year, $value){
        $query = "UPDATE user_holiday_settings SET exhausted = exhausted + :value WHERE user_id = :user_id AND year = :year;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $user_id);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":value", $value);
        $preparedQuery->execute();
    }

    /**
     * @param integer $user_id
     * @param integer $year
     * @param integer $value
     */
    static function decrement($user_id, $year, $value){
        $query = "UPDATE user_holiday_settings SET exhausted = exhausted - :value WHERE user_id = :user_id AND year = :year;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $user_id);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->bindValue(":value", $value);
        $preparedQuery->execute();
    }


    /**
     * @param UserHolidaySettings $userHolidaySettings
     */
    static function save($userHolidaySettings)
    {
        $query = "insert into user_holiday_settings (user_id, year, days) value (:user_id, :year, :days) on duplicate key update days = :days;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userHolidaySettings->getUserId());
        $preparedQuery->bindValue(":year", $userHolidaySettings->getYear());
        $preparedQuery->bindValue(":days", $userHolidaySettings->getDays());

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
        return array_merge(array(), get_object_vars($this));
    }
}