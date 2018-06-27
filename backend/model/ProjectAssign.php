<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 13.06.2018
 * Time: 22:04
 */

include_once(__DIR__ . "/Project.php");
include_once(__DIR__ . "/SimpleUser.php");


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
     * @var Project|null
     */
    private $project = "";

    /***
     * @var SimpleUser| null
     */
    private $simpleUser = "";

    /**
     * @return null|SimpleUser
     */
    public function getSimpleUser()
    {
        return $this->simpleUser;
    }

    /**
     * @param null|SimpleUser $simpleUser
     */
    public function setSimpleUser($simpleUser)
    {
        $this->simpleUser = $simpleUser;
    }

    /**
     * @return string
     */
    public function getProjectId()
    {
        return $this->projectId;
    }

    /**
     * @param string $projectId
     */
    public function setProjectId($projectId)
    {
        $this->projectId = $projectId;
    }

    /**
     * @return string
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param string $userId
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
    public function getObligation()
    {
        return $this->obligation;
    }

    /**
     * @param float $obligation
     */
    public function setObligation($obligation)
    {
        $this->obligation = $obligation;
    }


    /**
     * @return null|Project
     */
    public function getProject()
    {
        return $this->project;
    }

    /**
     * @param null|Project $project
     */
    public function setProject($project)
    {
        $this->project = $project;
    }


    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setProjectId($row["project_id"]);
        self::setUserId($row["user_id"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);
        self::setObligation($row["obligation"]);

        self::setSimpleUser(SimpleUser::findById(self::getUserId()));
    }

    /***
     * @param Project $project
     */
    private function addProject($project)
    {
        self::setProject($project);
    }

    /***
     * @param int $userId
     *
     * @return ProjectAssign [] array
     */
    public static function findAllByUserId($userId)
    {
        $query = 'SELECT * FROM user_assigned_to_project WHERE user_id=:user_id;';
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();
        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();

            $instance->fill($var);
            $instance->addProject(Project::findById($instance->getProjectId()));
            $arrayOfProjects[] = $instance;
        }

        return $arrayOfProjects;
    }

    /***
     * @param int $projectId
     *
     * @return ProjectAssign [] array
     */
    public static function findAllByProjectId($projectId)
    {
        $query = 'SELECT * FROM user_assigned_to_project WHERE project_id=:project_id;';
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":project_id", $projectId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();
        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();

            $instance->fill($var);
            $instance->addProject(Project::findById($instance->getProjectId()));
            $arrayOfProjects[] = $instance;
        }

        return $arrayOfProjects;
    }


    /***
     * @param int $userId
     * @param int $year
     * @return ProjectAssign [] array
     */
    public static function findAllByUserIdAndYear($userId, $year)
    {
        $query = 'SELECT * FROM user_assigned_to_project WHERE user_id=:user_id AND YEAR(active_from)<=:year 
AND ((active_to is null or active_to = \'\')  OR (YEAR(active_to) >=:year));';
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();
        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $instance->addProject(Project::findById($instance->getProjectId()));
            $arrayOfProjects[] = $instance;
        }
        return $arrayOfProjects;
    }

    /***
     * @param int $userId
     * @param int $month
     * @param int $year
     *
     * @return ProjectAssign [] array
     */
    public static function findByUserIdAllActiveInMonthAndYear($userId, $month, $year)
    {
        $query = 'SELECT * FROM user_assigned_to_project WHERE user_id=:user_id 
AND YEAR(active_from)<=:year AND MONTH(active_from)<=:month  AND ((active_to is null or active_to = \'\') 
OR (YEAR(active_to) >=:year AND MONTH(active_to) >=:month));';
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":month", $month);
        $preparedQuery->bindValue(":year", $year);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();
        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $instance->addProject(Project::findById($instance->getProjectId()));
            $arrayOfProjects[] = $instance;
        }
        return $arrayOfProjects;
    }


    /***
     * @param $userId
     * @param $projectId
     *
     * @return ProjectAssign [] array
     */
    public static function findAllByUserIdAndProjectId($userId, $projectId)
    {
        $query = 'SELECT * FROM user_assigned_to_project WHERE user_id=:user_id  AND project_id=:project_id;';
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $userId);
        $preparedQuery->bindValue(":project_id", $projectId);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();
        $arrayOfProjects = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $instance->addProject(Project::findById($instance->getProjectId()));
            $arrayOfProjects[] = $instance;
        }
        return $arrayOfProjects;
    }

    /**
     * @param ProjectAssign $projectAssign
     */
    static function delete($projectAssign)
    {
        $query = "DELETE FROM user_assigned_to_project WHERE user_id = :user_id AND project_id = :project_id AND active_from = :active_from";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":user_id", $projectAssign->getUserId());
        $preparedQuery->bindValue(":project_id", $projectAssign->getProjectId());
        $preparedQuery->bindValue(":active_from", $projectAssign->getActiveFrom());
        $preparedQuery->execute();
    }

    /**
     * @param ProjectAssign $projectAssign
     */
    static function save($projectAssign)
    {
        $query = "insert into user_assigned_to_project (user_id, project_id, active_from, active_to, obligation)
 value (:user_id, :project_id, :active_from, :active_to, :obligation) 
 on duplicate key update active_from = :active_from, active_to = :active_to, obligation = :obligation;";
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