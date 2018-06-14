<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 13.06.2018
 * Time: 22:04
 */

class ProjectAssign implements JsonSerializable
{
    /**
     * @var string
     */
    private $projectId = -1;
    /**
     * @var string
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
    private $obligation = 0.0;

    /**
     * @return string
     */
    public function getProjectId(): string
    {
        return $this->projectId;
    }

    /**
     * @param string $projectId
     */
    public function setProjectId(string $projectId): void
    {
        $this->projectId = $projectId;
    }

    /**
     * @return string
     */
    public function getUserId(): string
    {
        return $this->userId;
    }

    /**
     * @param string $userId
     */
    public function setUserId(string $userId): void
    {
        $this->userId = $userId;
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
     * @return null|string
     */
    public function getActiveTo(): ?string
    {
        return $this->activeTo;
    }

    /**
     * @param null|string $activeTo
     */
    public function setActiveTo(?string $activeTo): void
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
        self::setProjectId($row["user_id"]);
        self::setUserId($row["project_id"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);
        self::setObligation($row["obligation"]);
    }

    /**
     * @param ProjectAssign $projectAssign
     */
    static function save($projectAssign)
    {
        $query = "insert into user_assigned_to_project (user_id, project_id, active_from, active_to, obligation) value (:user_id, :project_id, :active_from, :active_to, :obligation) on duplicate key update active_from = :active_from, active_to = :active_to, obligation = :obligation;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $projectAssign->getUserId());
        $preparedQuery->bindValue(":project_id", $projectAssign->getProjectId());
        $preparedQuery->bindValue(":active_from", $projectAssign->getActiveFrom());
        $preparedQuery->bindValue(":active_to", $projectAssign->getActiveTo());
        $preparedQuery->bindValue(":obligation", $projectAssign->getObligation());

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
        return get_object_vars($this);
    }
}