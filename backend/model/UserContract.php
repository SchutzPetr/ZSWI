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


}