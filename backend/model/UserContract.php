<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:27
 */

include_once(__DIR__ . "/../database/Database.php");
include_once(__DIR__ . "/UserProjectAssignment.php");

class UserContract implements JsonSerializable
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
     * @var string|null
     */
    private $activeTo = "";
    /**
     * @var double
     */
    private $obligationKIV = 0;
    /**
     * @var double
     */
    private $obligationNTIS = 0;

    /**
     * @var UserProjectAssignment[]
     */
    private $userProjectAssignment = [];

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
     * @return null|string
     */
    public function getActiveTo()
    {
        return $this->activeTo;
    }

    /**
     * @param null|string $activeTo
     */
    public function setActiveTo($activeTo)
    {
        $this->activeTo = $activeTo;
    }

    /**
     * @return float
     */
    public function getObligationKIV()
    {
        return $this->obligationKIV;
    }

    /**
     * @param float $obligationKIV
     */
    public function setObligationKIV($obligationKIV)
    {
        $this->obligationKIV = $obligationKIV;
    }

    /**
     * @return float
     */
    public function getObligationNTIS()
    {
        return $this->obligationNTIS;
    }

    /**
     * @param float $obligationNTIS
     */
    public function setObligationNTIS($obligationNTIS)
    {
        $this->obligationNTIS = $obligationNTIS;
    }

    /**
     * @return UserProjectAssignment[]
     */
    public function getUserProjectAssignment()
    {
        return $this->userProjectAssignment;
    }

    /**
     * @param UserProjectAssignment[] $userProjectAssignment
     */
    public function setUserProjectAssignment($userProjectAssignment)
    {
        $this->userProjectAssignment = $userProjectAssignment;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setUserId($row["user_id"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);
        self::setObligationKIV($row["obligation_KIV"]);
        self::setObligationNTIS($row["obligation_NTIS"]);
    }

    /**
     * @param $userId integer
     * @param $active_from string
     * @return UserContract
     */
    static function findLastByUserId($userId, $active_from)
    {
        $query = "SELECT * FROM user_contract WHERE user_id = :user_id AND active_from <= :active_from ORDER BY active_from DESC LIMIT 1;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":active_from", $active_from);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param $userId integer
     * @param $date string
     * @return UserContract
     */
    static function findValidByDateAndUserId($userId, $date)
    {
        $query = "SELECT * FROM user_contract WHERE user_id = :user_id AND active_from <= :active_from ORDER BY active_from DESC LIMIT 1";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":active_from", $date);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param $userId integer
     * @return UserContract
     */
    static function findCurrentByUserId($userId)
    {
        $query = "SELECT * FROM user_contract WHERE user_id = :user_id AND active_from <= :active_from ORDER BY active_from DESC LIMIT 1";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":active_from", date("Y-m-d"));
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    static function findCurrentAndAllFutureByUserIdAndDate($userId, $active_from)
    {
        $query = "(SELECT * FROM user_contract WHERE user_id = :user_id AND active_from <= :active_from ORDER BY active_from DESC LIMIT 1) UNION SELECT * FROM user_contract WHERE user_id = :user_id AND active_from > :active_from ORDER BY active_from;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":active_from", $active_from);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $array = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $array[] = $instance;

        }
        return $array;
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

    /**
     * @param UserContract $userContract
     */
    static function save($userContract)
    {
        $query = "insert into user_contract (user_id, active_from, active_to, obligation_KIV, obligation_NTIS) value (:user_id, :active_from, :active_to, :obligation_KIV, :obligation_NTIS) on duplicate key update active_to = :active_to, obligation_KIV = :obligation_KIV, obligation_NTIS = :obligation_NTIS";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userContract->getUserId());
        $preparedQuery->bindValue(":active_from", $userContract->getActiveFrom());
        $preparedQuery->bindValue(":active_to", $userContract->getActiveTo());
        $preparedQuery->bindValue(":obligation_KIV", $userContract->getObligationKIV());
        $preparedQuery->bindValue(":obligation_NTIS", $userContract->getObligationNTIS());

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
        $array = array_merge($array, get_object_vars($this));
        return $array;
    }

}