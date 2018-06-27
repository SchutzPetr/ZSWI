<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 01.06.2018
 * Time: 23:58
 */

class UnauthorizedException extends Exception
{
    public function __construct($message = "No user with these login information found.", $code = 0, Exception $previous =
    null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function __toString()
    {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}