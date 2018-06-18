<?php

/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 11.05.2018
 * Time: 21:57
 */

include_once(__DIR__ . "/../database/Database.php");
include_once(__DIR__ . "/BaseModel.php");
include_once(__DIR__ . "/Attendance.php");
include_once(__DIR__ . "/UserContract.php");

class SimpleUser extends BaseModel
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
     * @return string
     */
    public function displayFullName()
    {
        return trim($this->honorificPrefix . " " . $this->name . " " . $this->lastName . " " . $this->honorificSuffix);
    }

    /**
     * @param array $row from result
     */
    public function fill($row)
    {
        self::setId($row["id"]);
        self::setName($row["name"]);
        self::setLastName($row["last_name"]);
        self::setHonorificPrefix($row["honorific_prefix"]);
        self::setHonorificSuffix($row["honorific_suffix"]);
        self::setOrionLogin($row["orion_login"]);
        self::setAuthority($row["authority"]);
    }

    /**
     * @param int $id
     * @return SimpleUser
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user WHERE id = :user_id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $id);
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
     * @param string $orion
     * @return SimpleUser
     */
    static function findByOrion($orion)
    {
        $query = "SELECT * FROM user WHERE orion_login = :orion_login;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":orion_login", $orion);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param int $projectId
     * @return array
     */
    static function findByProjectId($projectId)
    {
        $query = "SELECT * FROM user WHERE id IN (SELECT DISTINCT user_id from user_assigned_to_project WHERE project_id = :projectId);";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":projectId", $projectId);
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
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM user";
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
     * @param $ids
     * @return SimpleUser[]
     */
    static function findAllByIds($ids)
    {
        if(empty($ids)){
            return array();
        }
        $clause = implode(',', array_fill(0, count($ids), '?'));

        $preparedQuery = Database::getConnection()->prepare("SELECT * FROM user WHERE id IN ("  . $clause . ");");

        for ($i = 1; $i <= sizeof($ids); $i++) {
            $preparedQuery->bindParam($i, $ids[$i-1]);
        }

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