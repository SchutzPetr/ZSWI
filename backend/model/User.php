<?php

/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 11.05.2018
 * Time: 21:57
 */

include_once (__DIR__."/../database/Database.php");
include_once (__DIR__."/BaseModel.php");
include_once (__DIR__."/Attendance.php");

class User extends BaseModel
{
    /**
     * @var string
     */
    private $name = "";
    /**
     * @var string
     */
    private $lastName = "";
    /**
     * @var string
     */
    private $honorificPrefix = "";
    /**
     * @var string
     */
    private $honorificSuffix = "";
    /**
     * @var string
     */
    private $orionLogin = "";
    /**
     * @var string
     */
    private $authority = "USER";
    /**
     * @var bool
     */
    private $active = true;
    /**
     * @var string
     */
    private $mainWorkStation = "";
    /**
     * @var Attendance
     */
    private $attendance = null;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string
     */
    public function getHonorificPrefix(): string
    {
        return $this->honorificPrefix;
    }

    /**
     * @param string $honorificPrefix
     */
    public function setHonorificPrefix(string $honorificPrefix): void
    {
        $this->honorificPrefix = $honorificPrefix;
    }

    /**
     * @return string
     */
    public function getHonorificSuffix(): string
    {
        return $this->honorificSuffix;
    }

    /**
     * @param string $honorificSuffix
     */
    public function setHonorificSuffix(string $honorificSuffix): void
    {
        $this->honorificSuffix = $honorificSuffix;
    }

    /**
     * @return string
     */
    public function getOrionLogin(): string
    {
        return $this->orionLogin;
    }

    /**
     * @param string $orionLogin
     */
    public function setOrionLogin(string $orionLogin): void
    {
        $this->orionLogin = $orionLogin;
    }

    /**
     * @return string
     */
    public function getAuthority(): string
    {
        return $this->authority;
    }

    /**
     * @param string $authority
     */
    public function setAuthority(string $authority): void
    {
        $this->authority = $authority;
    }

    /**
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    /**
     * @return string
     */
    public function getMainWorkStation(): string
    {
        return $this->mainWorkStation;
    }

    /**
     * @param string $mainWorkStation
     */
    public function setMainWorkStation(string $mainWorkStation): void
    {
        $this->mainWorkStation = $mainWorkStation;
    }

    /**
     * @return Attendance
     */
    public function getAttendance(): Attendance
    {
        return $this->attendance;
    }

    /**
     * @param Attendance $attendance
     */
    public function setAttendance(Attendance $attendance): void
    {
        $this->attendance = $attendance;
    }

    /**
     * @return string
     */
    public function displayFullName()
    {
        return trim($this->honorificPrefix . " " . $this->name . " " . $this->lastName . " " . $this->honorificSuffix);
    }

    /**
     * @param array $row
     */
    private function fill($row)
    {
        self::setId($row["user_id"]);
        self::setName($row["name"]);
        self::setLastName($row["last_name"]);
        self::setHonorificPrefix($row["honorific_prefix"]);
        self::setHonorificSuffix($row["honorific_suffix"]);
        self::setOrionLogin($row["orion_login"]);
        self::setAuthority($row["authority"]);
        self::setActive($row["is_active"]);
        self::setMainWorkStation($row["main_work_station"]);

        /**
         * $datetimeFormat = 'Y-m-d H:i:s';

        $date = new \DateTime();
        // If you must have use time zones
        // $date = new \DateTime('now', new \DateTimeZone('Europe/Helsinki'));
        $date->setTimestamp($timestamp);
         */

        //$attendance init
        $attendance = new Attendance();
        $attendance->setId($row["attendance_id"]);
        $attendance->setUserId($row["user_id"]);
        $attendance->setActiveFrom($row["active_from"]);
        $attendance->setFirstPartFrom($row["first_part_from"]);
        $attendance->setFirstPartTo($row["first_part_to"]);
        $attendance->setSecondPartFrom($row["second_part_from"]);
        $attendance->setSecondPartTo($row["second_part_to"]);

        self::setAttendance($attendance);
    }

    /**
     * @param int $id
     * @return User
     */
    static function findById($id)
    {
        $query = "SELECT *, user.id as user_id, a.id as attendance_id FROM user JOIN attendance a on user.id = a.user_id WHERE user.id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @return User[]
     *
     * Funkce, která nalezne všechny uživatele a vrátí je jako jedno pole.
     */
    static function findAll()
    {
        $query = "SELECT *, user.id as user_id, a.id as attendance_id FROM user JOIN attendance a on user.id = a.user_id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfUsers = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUsers[] = $instance;

        }
        return $arrayOfUsers;
    }

    /**
     * @param User $user
     *
     * Funkce, která založí nového uživatele. Pokud však existuje uživatel se stejným id,
     * tak dojde k updatu.
     */
    static function save($user)
    {
        $query = "insert into user (id, orion_login, name, last_name, honorific_prefix, honorific_suffix, authority, is_active, main_work_station) value (:id, :orionLogin, :name, :lastName, :honorificPrefix, :honorificSuffix, :authority, :isActive, :mainWorkStation) on duplicate key update orion_login = :orionLogin, name = :name,last_name = :lastName,honorific_prefix = :honorificPrefix, honorific_suffix = :honorificSuffix, authority = :authority, is_active = :isActive, main_work_station = :mainWorkStation;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $user->getId() == -1 ? null : $user->getId());
        $preparedQuery->bindValue(":orionLogin", $user->getOrionLogin());
        $preparedQuery->bindValue(":name", $user->getName());
        $preparedQuery->bindValue(":lastName", $user->getLastName());
        $preparedQuery->bindValue(":honorificPrefix", $user->getHonorificPrefix());
        $preparedQuery->bindValue(":honorificSuffix", $user->getHonorificSuffix());
        $preparedQuery->bindValue(":authority", $user->getAuthority());
        $preparedQuery->bindValue(":isActive", $user->isActive(), PDO::PARAM_BOOL);
        $preparedQuery->bindValue(":mainWorkStation", $user->getMainWorkStation());

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