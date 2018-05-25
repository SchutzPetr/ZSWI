<?php
/**
 * Created by PhpStorm.
 * User: ondrejvane
 * Date: 24.05.18
 * Time: 11:27
 */

class UserContract extends BaseModel
{
    private $workStation = "";
    private $obligation = "";
    private $activeFrom = "";
    private $activeTo = "";

    /**
     * @return string
     */
    public function getWorkStation()
    {
        return $this->workStation;
    }

    /**
     * @param string $workStation
     */
    public function setWorkStation($workStation)
    {
        $this->workStation = $workStation;
    }

    /**
     * @return string
     */
    public function getObligation()
    {
        return $this->obligation;
    }

    /**
     * @param string $obligation
     */
    public function setObligation($obligation)
    {
        $this->obligation = $obligation;
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
     * @return string
     */
    public function getActiveTo()
    {
        return $this->activeTo;
    }

    /**
     * @param string $activeTo
     */
    public function setActiveTo($activeTo)
    {
        $this->activeTo = $activeTo;
    }

    /**
     * @param $row
     */
    private function fill($row)
    {
        self::setWorkStation($row["work_station"]);
        self::setObligation($row["obligation"]);
        self::setActiveFrom($row["active_from"]);
        self::setActiveTo($row["active_to"]);

    }

    /**
     * @param $id
     * @return UserContract
     */
    static function findById($id)
    {
        $query = "SELECT * FROM user_contract WHERE id = :id;";
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
        $query = "SELECT * FROM user_contract;";
        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->execute();
        $result = $preparedQuery->fetchAll();

        foreach ($result as $var) {
            $instance = new self();
            $instance->fill($var);
            $arrayOfUserContracts[] = $instance;

        }
        return $arrayOfUserContracts;
    }


}