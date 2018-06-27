<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 17.06.2018
 * Time: 13:34
 */

if (!array_key_exists("HTTP_X_AUTH_TOKEN", $_SERVER)) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}