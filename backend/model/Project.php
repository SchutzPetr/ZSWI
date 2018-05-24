<?php
/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 16.05.2018
 * Time: 23:17
 */

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
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM project;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfProjects[] = $instance;

        }
        return $arrayOfProjects;
    }
}