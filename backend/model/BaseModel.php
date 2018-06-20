<?php /** @noinspection PhpInconsistentReturnPointsInspection */

/**
 * Created by PhpStorm.
 * User: Petr Schutz
 * Date: 11.05.2018
 * Time: 21:58
 */
abstract class BaseModel implements JsonSerializable
{

    /**
     * @var int
     */
    private $id = -1;

    /**
     * Magicka metoda, vola se, kdyz se pristupuje na nedostupnou metodu tridy
     * http://php.net/manual/en/language.oop5.magic.php
     * V pripade ze se jedna o get/set, nastavi se odpovidajici clenska promenna
     */
    function __call($method, $params)
    {

        $var = lcfirst(substr($method, 3));

        // Test, zda zadana metoda odpovida existujici promenne.
        // Pokud by se neprovadel, neexistujici promenna se prida, coz nekdy
        // muze byt zadouci, jindy ne
        if (property_exists($this, $var)) {

            if (strncasecmp($method, "get", 3) === 0) {
                return $this->$var;
            }

            if (strncasecmp($method, "set", 3) === 0) {
                $this->$var = $params[0];
            }
        }
        // ?else Pripadna chybova reakce
    }

    /**
     * Prevede instanci na json
     */
    public function json_encode()
    {
        return json_encode(get_object_vars($this));
    }

    /**
     * Aktualizuje hodnoty instance podle jsonu
     * @param string $json
     */
    public function json_decode($json)
    {
        $values = json_decode($json);
        foreach ($values as $key => $value) {
            $this->$key = $value;
        }
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }
}