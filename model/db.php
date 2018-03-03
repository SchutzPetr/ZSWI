<?php defined('INDEX') OR die('Прямой доступ к странице запрещён!');


// MYSQL
class MyDB
{
    public $conn;

    function __construct()
    {

        $dsn = 'mysql:host=localhost;dbname=db_web';
        $user = 'root';
        $password = '';


        // Create connection
        try { //https://www.w3schools.com/PhP/php_mysql_connect.asp
            $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',);
            $this->conn = new PDO($dsn, $user, $password);
            if (!isset($_SESSION)) {
                session_start();
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            die();
        }
    }

}

?>
