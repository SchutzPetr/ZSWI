<?php

/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 11.05.2018
 * Time: 21:57
 */
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
    private $orion = "";
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
    public function getOrion()
    {
        return $this->orion;
    }

    /**
     * @param string $orion
     */
    public function setOrion($orion)
    {
        $this->orion = $orion;
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

    static function findById($id)
    {
        $query = "SELECT * FROM user WHERE id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        //todo: get user from Db by given id
    }

    static function findAll($id)
    {
        $query = "SELECT * FROM user;";
        $preparedQuery = Database::getConnection()->prepare($query);
        //todo: get all user from Db
    }

    /**
     * @param User $user
     */
    static function save($user)
    {
        $query = "insert into user (id, orion_login, name, last_name, honorific_prefix, honorific_suffix, authority, is_active, main_work_station) value (:id, :orionLogin, :name, :lastName, :honorificPrefix, :honorificSuffix, :authority, :isActive, :mainWorkStation) on duplicate key update orion_login = :orionLogin, name = :name,last_name = :lastName,honorific_prefix = :honorificPrefix, honorific_suffix = :honorificSuffix, authority = :authority, is_active = :isActive, main_work_station = :mainWorkStation;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":orionLogin", $user->getOrion());
        $preparedQuery->bindValue(":name", $user->getName());
        $preparedQuery->bindValue(":lastName", $user->getLastName());
        $preparedQuery->bindValue(":honorificPrefix", $user->getHonorificPrefix());
        $preparedQuery->bindValue(":honorificSuffix", $user->getHonorificSuffix());
        $preparedQuery->bindValue(":authority", $user->getAuthority());
        $preparedQuery->bindValue(":isActive", $user->isActive());
        $preparedQuery->bindValue(":mainWorkStation", $user->getMainWorkStation());

        //todo: insert or update
    }
}