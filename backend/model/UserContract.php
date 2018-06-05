<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:27
 */

include_once (__DIR__."../database/Database.php");
include_once (__DIR__."BaseModel.php");

class UserContract extends BaseModel
{
    /**
     * @var int
     */
    private $user_id = -1;
    /**
     * @var string
     */
    private $workStation = "";
    /**
     * @var double
     */
    private $obligation = "";
    /**
     * @var DateTime
     */
    private $activeFrom = "";
    /**
     * @var DateTime
     */
    private $activeTo = "";

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param int $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * @return string
     */
    public function getWorkStation()
    {
        return $this->workStation;
    }

    /**
     * @param string $workStation
     */
    public function setWorkStation($workStation)
    {
        $this->workStation = $workStation;
    }

    /**
     * @return double
     */
    public function getObligation()
    {
        return $this->obligation;
    }

    /**
     * @param double $obligation
     */
    public function setObligation($obligation)
    {
        $this->obligation = $obligation;
    }

    /**
     * @return DateTime
     */
    public function getActiveFrom()
    {
        return $this->activeFrom;
    }

    /**
     * @param DateTime $activeFrom
     */
    public function setActiveFrom($activeFrom)
    {
        $this->activeFrom = $activeFrom;
    }

    /**
     * @return DateTime
     */
    public function getActiveTo()
    {
        return $this->activeTo;
    }

    /**
     * @param DateTime $activeTo
     */
    public function setActiveTo($activeTo)
    {
        $this->activeTo = $activeTo;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setId($row["id"]);
        self::setUserId($row["user_id"]);
        self::setWorkStation($row["work_station"]);
        self::setObligation($row["obligation"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);

    }

    /**
     * @param int $id
     * @return UserContract
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user_contract WHERE id = :id;";
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
        $query = "SELECT * FROM user_contract;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUserContracts = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUserContracts[] = $instance;

        }
        return $arrayOfUserContracts;
    }

    static function save($userContract)
    {
        $query = "insert into user_contract (id, work_station, obligation, active_from, active_to) value (:id, :work_station, :obligation, :active_from, :active_to) on duplicate key update work_station = :work_station, obligation = :obligation, active_from = :active_from, active_to = :active_to;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $userContract->getId() == -1 ? null : $userContract->getId());
        $preparedQuery->bindValue(":work_station", $userContract->getWorkStation());
        $preparedQuery->bindValue(":obligation", $userContract->getObligation());
        $preparedQuery->bindValue(":active_from", $userContract->getActiveFrom());
        $preparedQuery->bindValue(":active_to", $userContract->getActiveTo());

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