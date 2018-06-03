<?php

/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 11.05.2018
 * Time: 21:57
 */

include_once (__DIR__."/../database/Database.php");
include_once (__DIR__."/BaseModel.php");

class User extends BaseModel implements JsonSerializable
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
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string
     */
    public function getHonorificPrefix()
    {
        return $this->honorificPrefix;
    }

    /**
     * @param string $honorificPrefix
     */
    public function setHonorificPrefix($honorificPrefix)
    {
        $this->honorificPrefix = $honorificPrefix;
    }

    /**
     * @return string
     */
    public function getHonorificSuffix()
    {
        return $this->honorificSuffix;
    }

    /**
     * @param string $honorificSuffix
     */
    public function setHonorificSuffix($honorificSuffix)
    {
        $this->honorificSuffix = $honorificSuffix;
    }

    /**
     * @return string
     */
    public function getOrionLogin()
    {
        return $this->orionLogin;
    }

    /**
     * @param string $orionLogin
     */
    public function setOrionLogin($orionLogin)
    {
        $this->orionLogin = $orionLogin;
    }

    /**
     * @return string
     */
    public function getAuthority()
    {
        return $this->authority;
    }

    /**
     * @param string $authority
     */
    public function setAuthority($authority)
    {
        $this->authority = $authority;
    }

    /**
     * @return bool
     */
    public function isActive()
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive($active)
    {
        $this->active = $active;
    }

    /**
     * @return string
     */
    public function getMainWorkStation()
    {
        return $this->mainWorkStation;
    }

    /**
     * @param string $mainWorkStation
     */
    public function setMainWorkStation($mainWorkStation)
    {
        $this->mainWorkStation = $mainWorkStation;
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
        self::setId($row["id"]);
        self::setName($row["name"]);
        self::setLastName($row["last_name"]);
        self::setHonorificPrefix($row["honorific_prefix"]);
        self::setHonorificSuffix($row["honorific_suffix"]);
        self::setOrionLogin($row["orion_login"]);
        self::setAuthority($row["authority"]);
        self::setActive($row["is_active"]);
        self::setMainWorkStation($row["main_work_station"]);
    }

    /**
     * @param int $id
     * @return User
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user WHERE id = :id;";
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
        $query = "SELECT * FROM user;";
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