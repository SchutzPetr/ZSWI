<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 11.10.2017
 * Time: 15:19
 */

class Database
{

    // specify database credentials
    private static $host = "localhost";
    private static $port = 3306;
    private static $db_name = "attendance_new";
    private static $username = "root";
    private static $password = "";
    public static $conn;

    // get the database connection
    public static function getConnection()
    {
        if (isset(self::$conn)) {
            return self::$conn;
        }
        try {
            self::$conn = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db_name . ";port=" . self::$port, self::$username, self::$password);
            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$conn->exec("SELECT 1;");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return self::$conn;
    }
}