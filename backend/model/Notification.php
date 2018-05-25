<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:32
 */

class Notification extends BaseModel
{
    /**
     * @var string
     */
    private $title = "";

    /**
     * @var string
     */
    private $description = "";

    /**
     * @var string
     */
    private $link = "";

    /**
     * @var string
     */
    private $read = "";

    /**
     * @param $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @param $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @param $link
     */
    public function setLink($link)
    {
        $this->link = $link;
    }

    /**
     * @param $read
     */
    public function setRead($read)
    {
        $this->read = $read;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return string
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * @return string
     */
    public function getRead()
    {
        return $this->read;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setId($row["id"]);
        self::setTitle($row["title"]);
        self::setDescription($row["description"]);
        self::setLink($row["link"]);
        self::setRead($row["read"]);
    }

    /**
     * @param $id
     * @return Notification
     */
    static function findById($id)
    {
        $query = "SELECT * FROM notification WHERE id = :id;";
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
        $query = "SELECT * FROM notification;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfNotifications[] = $instance;

        }
        return $arrayOfNotifications;
    }

}