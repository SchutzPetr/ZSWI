<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 10.06.2018
 * Time: 20:54
 */

class UserProjectAssignment implements JsonSerializable
{
    /**
     * @var int
     */
    private $userId = -1;
    /**
     * @var int
     */
    private $projectId = -1;
    /**
     * @var string
     */
    private $activeFrom = "";
    /**
     * @var string
     */
    private $activeTo = "";
    /**
     * @var double
     */
    private $obligation = 0;

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     */
    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    /**
     * @return int
     */
    public function getProjectId(): int
    {
        return $this->projectId;
    }

    /**
     * @param int $projectId
     */
    public function setProjectId(int $projectId): void
    {
        $this->projectId = $projectId;
    }

    /**
     * @return string
     */
    public function getActiveFrom(): string
    {
        return $this->activeFrom;
    }

    /**
     * @param string $activeFrom
     */
    public function setActiveFrom(string $activeFrom): void
    {
        $this->activeFrom = $activeFrom;
    }

    /**
     * @return string
     */
    public function getActiveTo(): string
    {
        return $this->activeTo;
    }

    /**
     * @param string $activeTo
     */
    public function setActiveTo(string $activeTo): void
    {
        $this->activeTo = $activeTo;
    }

    /**
     * @return float
     */
    public function getObligation(): float
    {
        return $this->obligation;
    }

    /**
     * @param float $obligation
     */
    public function setObligation(float $obligation): void
    {
        $this->obligation = $obligation;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setUserId($row["user_id"]);
        self::setProjectId($row["project_id"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);
        self::setObligation($row["obligation"]);
    }

    /**
     * @param $userId integer
     * @param $activeFrom integer
     * @param $workStation integer
     * @return UserProjectAssignment[]
     */
    static function findAllUserIdActiveFromWorkStation($userId, $activeFrom, $workStation){
        $query = "SELECT * FROM user_assigned_to_project WHERE user_id = :user_id AND user_id = :active_from AND user_id = :work_station;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":active_from", $activeFrom);
        $preparedQuery->bindValue(":work_station", $workStation);
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
     * @param UserProjectAssignment $userProjectAssignment
     */
    static function save($userProjectAssignment)
    {
        $query = "insert into user_assigned_to_project (user_id, project_id, active_from, active_to, obligation) value (:user_id, :project_id, :active_from, :active_to, :obligation) on duplicate key update active_to = :active_to,  obligation = :obligation";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userProjectAssignment->getUserId());
        $preparedQuery->bindValue(":project_id", $userProjectAssignment->getProjectId());
        $preparedQuery->bindValue(":active_from", $userProjectAssignment->getActiveFrom());
        $preparedQuery->bindValue(":active_to", $userProjectAssignment->getActiveTo());
        $preparedQuery->bindValue(":obligation", $userProjectAssignment->getObligation());

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