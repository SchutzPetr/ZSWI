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
     * Notification constructor.
     * @param $title
     * @param $description
     * @param $link
     * @param $read
     */
    public function __construct($title, $description, $link, $read){
        $this->title = $title;
        $this->description = $description;
        $this->link = $link;
        $this->read = $read;
    }

    /**
     * @param $title
     */
    public function setTitle($title){
        $this->title = $title;
    }

    /**
     * @param $description
     */
    public function setDescription($description){
        $this->description = $description;
    }

    /**
     * @param $link
     */
    public function setLink($link){
        $this->link = $link;
    }

    /**
     * @param $read
     */
    public function setRead($read){
        $this->read = $read;
    }

    /**
     * @return string
     */
    public function getTitle(){
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDescription(){
        return $this->description;
    }

    /**
     * @return string
     */
    public function getLink(){
        return $this->link;
    }

    /**
     * @return string
     */
    public function getRead(){
        return $this->read;
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
        $notification = $preparedQuery->fetch();

        return new Notification($notification["title"],$notification["description"],$notification["link"],$notification["read"]);
    }

    /**
     * @return array
     */
    static function findAll()
    {
        $query = "SELECT * FROM notification;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $notifications = $preparedQuery->fetchAll();

        foreach ($notifications as $var) {
            $tempNotification = new Notification($var["title"],$var["description"],$var["link"],$var["read"]);
            $arrayFoundNotifications[] = $tempNotification;

        }
        return $arrayFoundNotifications;
    }
}