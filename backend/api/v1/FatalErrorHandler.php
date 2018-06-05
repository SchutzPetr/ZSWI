<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 05.06.2018
 * Time: 20:21
 */

register_shutdown_function('handle');

function handle()
{
    $last_error = error_get_last();
    if ($last_error['type'] === E_ERROR) {
        header('HTTP/1.1 500 Internal Server Error');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode($last_error));
    }
}