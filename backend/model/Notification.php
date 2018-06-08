<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:32
 */

include_once (__DIR__."/../database/Database.php");
include_once (__DIR__."/BaseModel.php");

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
     * @var int
     */
    private $shown = "";

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @param string $link
     */
    public function setLink($link)
    {
        $this->link = $link;
    }

    /**
     * @param int $shown
     */
    public function setShown($shown)
    {
        $this->shown = $shown;
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
    public function getShown()
    {
        return $this->shown;
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
        self::setShown($row["shown"]);
    }

    /**
     * @param int $id
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

        $arrayOfNotifications = array();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfNotifications[] = $instance;

        }
        return $arrayOfNotifications;
    }

	/**
	 * @return array
	 */
	static function findAllUnread(){
		$query = "SELECT * FROM notification WHERE shown=0;";
		$preparedQuery = Database::getConnection()->prepare($query);
		$preparedQuery->execute();
		$result = $preparedQuery->fetchAll();

		$arrayOfNotifications = array();

		foreach ($result as $var) {
			$instance = new self();
			$instance->fill($var);
			$arrayOfNotifications[] = $instance;

		}
		return $arrayOfNotifications;
	}

    static function save($notification)
    {
        $query = "insert into notification (id, title, description, link, shown) value (:id, :title, :description, :link, :shown) on duplicate key update title = :title, description = :description, link = :link, shown = :shown;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":id", $notification->getId() == -1 ? null : $notification->getId());
        $preparedQuery->bindValue(":title", $notification->getTitle());
        $preparedQuery->bindValue(":description", $notification->getDescription());
        $preparedQuery->bindValue(":link", $notification->getLink());
        $preparedQuery->bindValue(":shown", $notification->getShown());

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