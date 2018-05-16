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
}