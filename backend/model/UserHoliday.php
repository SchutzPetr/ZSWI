<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:17
 */

class UserHoliday extends BaseModel
{
    private $userId = -1;   //TODO: Nastavit cizí klíč, pokud je zde -1 je porušena integrita databáze.
    private $day = "";
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
        //self::setUserId($row["user_id"]);
        self::setDate($row["day"]);
        self::setType($row["type"]);
    }

    /**
     * @param $id
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
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM user_holiday;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUservacations[] = $instance;

        }
        return $arrayOfUservacations;
    }

    /**
     * @param $holiday
     *
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
}