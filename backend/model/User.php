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
     * @var Attendance[]
     */
    private $attendanceSchedules = array();
    /**
     * @var UserContract
     */
    private $currentUserContract = null;
    /**
     * @var UserContract[]
     */
    private $futureUserContract = array();

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
     * @return Attendance[]
     */
    public function getAttendanceSchedules(): array
    {
        return $this->attendanceSchedules;
    }

    /**
     * @param Attendance[] $attendanceSchedules
     */
    public function setAttendanceSchedules(array $attendanceSchedules): void
    {
        $this->attendanceSchedules = $attendanceSchedules;
    }

    /**
     * @return UserContract
     */
    public function getCurrentUserContract(): UserContract
    {
        return $this->currentUserContract;
    }

    /**
     * @param UserContract $currentUserContract
     */
    public function setCurrentUserContract(UserContract $currentUserContract): void
    {
        $this->currentUserContract = $currentUserContract;
    }

    /**
     * @return UserContract[]
     */
    public function getFutureUserContract(): array
    {
        return $this->futureUserContract;
    }

    /**
     * @param UserContract[] $futureUserContract
     */
    public function setFutureUserContract(array $futureUserContract): void
    {
        $this->futureUserContract = $futureUserContract;
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
        self::setAttendanceSchedules(Attendance::findLastByUserId(self::getId()));

        $userContracts = UserContract::findCurrentAndAllFutureByUserIdAndDate(self::getId(), date("Y-m-d"));

        if(!empty($userContracts)){
            self::setCurrentUserContract($userContracts[0]);
            self::setFutureUserContract(array_slice($userContracts, 1));
        }
    }

    /**
     * @param int $id
     * @return User
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user WHERE id = :user_id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param string $orion
     * @return User
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
     * @param User $user
     *
     * Funkce, která založí nového uživatele. Pokud však existuje uživatel se stejným id,
     * tak dojde k updatu.
     * @return User
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


        return self::findByOrion($user->getOrionLogin());
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