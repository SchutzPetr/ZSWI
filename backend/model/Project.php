<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:17
 */

include_once(__DIR__ . "/../database/Database.php");
include_once(__DIR__ . "/BaseModel.php");

class Project extends BaseModel
{
    /**
     * @var string
     */
    private $projectName = "";
    /**
     * @var string
     */
    private $projectNameShort = "";
    /**
     * @var string
     */
    private $description = "";

    /**
     * @return string
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * @param string $projectName
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;
    }

    /**
     * @return string
     */
    public function getProjectNameShort()
    {
        return $this->projectNameShort;
    }

    /**
     * @param string $projectNameShort
     */
    public function setProjectNameShort($projectNameShort)
    {
        $this->projectNameShort = $projectNameShort;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setId($row["id"]);
        self::setProjectName($row["project_name"]);
        self::setProjectNameShort($row["project_name_short"]);
        self::setDescription($row["description"]);
    }

    /**
     * @param $id
     * @return Project
     */
    static function findById($id)
    {
        $query = "SELECT * FROM project WHERE id = :id;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $id);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        $instance = new self();
        $instance->fill($result);

        return $instance;
    }

    /**
     * @param $projectId Integer
     * @param $userIds Integer[]
     */
    static function assignUsers($projectId, $userIds)
    {

    }

    /**
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM project;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfProjects[] = $instance;

        }
        return $arrayOfProjects;
    }

    /**
     * @param Project $project
     */
    static function save($project)
    {
        $query = "insert into project (id, project_name, project_name_short, description) value (:id, :project_name, :project_name_short, :description) on duplicate key update project_name = :project_name, project_name_short = :project_name_short, description = :description;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $project->getId() == -1 ? null : $project->getId());
        $preparedQuery->bindValue(":project_name", $project->getProjectName());
        $preparedQuery->bindValue(":project_name_short", $project->getProjectNameShort());
        $preparedQuery->bindValue(":description", $project->getDescription());

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