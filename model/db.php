<?php
//defined('INDEX') OR die('Прямой доступ к странице запрещён!');

include_once("User.php");

// MYSQL
class MyDB
{
    public $conn;

    function __construct()
    {
        $dsn = 'mysql:host=localhost;dbname=mydb';
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


    function generateMonthForAllActiveUsers($month, $year){


    }

    function setActiveStatus($setTo, $user_id){
	    $mysql_pdo_error = false;
	    $query = 'UPDATE user SET is_active =:setTo where id=:user_id;';
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':setTo', $setTo);
	    $sth->bindValue(':user_id', $user_id);
	    $sth->execute();//insert to db
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    //all is ok
		    return true;
	    }else{
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }

    }

    function getAllHolidaysInMonth($month, $year){
        $mysql_pdo_error = false;
        $query = "select *  from holidays WHERE  MONTH(day) =:month AND YEAR(day) =:year";
        $sth = $this->conn->prepare($query);
        $sth->bindValue(':month', $month, PDO::PARAM_STR);
        $sth->bindValue(':year', $year, PDO::PARAM_STR);
        $sth->execute();
        $errors = $sth->errorInfo();
        if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            $all = $sth->fetchAll(PDO::FETCH_ASSOC);
            return $all;
        }
        else{
            //TODO other error
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }
    }

    function deleteHolidaysByDay($day){
        $mysql_pdo_error = false;
        $query = 'DELETE FROM holidays WHERE day=:day';
        $sth = $this->conn->prepare($query);
        $sth->bindValue(':day', $day, PDO::PARAM_INT);
        $sth->execute();//insert to db
        $errors = $sth->errorInfo();
        if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            //all is ok
            return true;
        }else{
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }
    }

    /***
     * @return array all user in db
     */
    function getAllUsersForAdmin(){
        $mysql_pdo_error = false;
        $query = "select *  from user";
        $sth = $this->conn->prepare($query);
        $sth->execute();
        $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            $all = $sth->fetchAll(PDO::FETCH_ASSOC);
            $users = [];
            for ($i = 0; $i<count($all); $i++){
                $user = new User();
                $user->fill($all[$i]);
	            $users[$i] = $user;
            }
//            echo '<pre>'; print_r($all); echo '</pre>';
//            print_r(json_encode($all));
            return $users;
        }
        else{
            //TODO other error
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }

    }

    function getUserById($id){
	    $mysql_pdo_error = false;
	    $query = "select *  from user where id=:user_id";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':user_id', $id, PDO::PARAM_INT);
	    $sth->execute();
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    $all = $sth->fetchAll(PDO::FETCH_ASSOC);
		    $user = new User();
		    $user->fill($all[0]);
		    return $user;
	    }
	    else{
		    //TODO other error
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }

    }


    function getAllUserFroReportByID($id, $month, $year){
	    $day = 1;
	    $d = mktime(0, 0, 0, $month, $day, $year);

	    $dayFrom = date("Y-m-d", $d);
	    $dayTo = date("Y-m-d", strtotime($d));
	    $user = $this->getUserById($id);

	    $mysql_pdo_error = false;
	    $query = "select * from shedule where user_id=:user_id AND  day >=:day_from AND day <=:day_from";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':user_id', $id, PDO::PARAM_INT);
	    $sth->bindValue(':day_from', $dayFrom, PDO::PARAM_STR);
	    $sth->bindValue(':day_to', $dayTo, PDO::PARAM_STR);

	    $sth->execute();
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    $all = $sth->fetchAll(PDO::FETCH_ASSOC);
		    echo '<pre>'; print_r($all); echo '</pre>';
		    $user->addMonthData($all);
		    return $user;
	    }
	    else{
		    //TODO other error
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }
    }
    /***
     * return array with users id in vacation
     * @param $day
     * @return array
     */
    function getUsersInVacationByDay($day){
        $mysql_pdo_error = false;
        $query = "select * from user_has_vacation where user_id in (select id from vacation where day=:day)";
        $sth = $this->conn->prepare($query);
        $sth->bindValue(':day', $day, PDO::PARAM_STR);
        $sth->execute();
        $errors = $sth->errorInfo();
        if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            $all = $sth->fetchAll(PDO::FETCH_ASSOC);
            return $all;
        }
        else{
            //TODO other error
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }
    }

    function getUser($login){

    }

    function getAttendanceAllActiveUsersByMonthAndYear($month, $year){
        $mysql_pdo_error = false;
        $query = "select * from user where is_active =1";
        $sth = $this->conn->prepare($query);
        $sth->execute();
        $errors = $sth->errorInfo();
        if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            $allUsers = $sth->fetchAll(PDO::FETCH_ASSOC);
            $all = array();
            foreach ($allUsers as $user){
                $all[$user] = $this->getAttendanceUserByMonthAndYear($month, $year, $user['id']);
            }
            return $all;
        }
        else{
            //TODO other error
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }
    }

    function getAttendanceUserByMonthAndYear($month, $year, $user_id){
        $day = 1;
        $d = mktime(0, 0, 0, $month, $day, $year);

        $dayFrom = date("d.m.Y", $d);
        $dayTo = date("d.m.Y", strtotime($d));

        $mysql_pdo_error = false;
        $query = "select * from statement where id in (select statement_id from user_has_statement where user_id=:user_id) 
AND  date >=:day_from AND date <=:day_from";
        $sth = $this->conn->prepare($query);
        $sth->bindValue(':user_id', $user_id, PDO::PARAM_INT);
        $sth->bindValue(':day_from', $dayFrom, PDO::PARAM_STR);
        $sth->bindValue(':day_to', $dayTo, PDO::PARAM_STR);

        $sth->execute();
        $errors = $sth->errorInfo();
        if ($errors[0] + 0 > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            $all = $sth->fetchAll(PDO::FETCH_ASSOC);
            return $all;
        }
        else{
            //TODO other error
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }

    }

    /***
     * add new holiday
     * @param $day
     * @param $name_holidays
     * @return bool
     */
    function addHolidays($day, $name_holidays){
        $mysql_pdo_error = false;
        $query = 'INSERT INTO holidays (day, name) VALUES (:day, :name_holidays)';
        $sth = $this->conn->prepare($query);
        $sth->bindValue(':day', $day);
        $sth->bindValue(':name_holidays', $name_holidays);
        $sth->execute();//insert to db
        $errors = $sth->errorInfo();
        if ($errors[0] > 0){
            $mysql_pdo_error = true;
        }
        if ($mysql_pdo_error == false){
            //all is ok
            return true;
        }else{
            echo "Eror - PDOStatement::errorInfo(): ";
            print_r($errors);
            echo "SQL : $query";
        }

    }

    function addVacationToUser($day, $user_id){

    }


    ///////////////////////////////////////////////////////////////
    function close() {
        $conn = null;
        unset($conn);
    }
    function run($query) {
        $this->query = $query;
        $this->result = mysql_query($this->query, $this->link);
        $this->err = mysql_error();
    }
    function row() {
        $this->data = mysql_fetch_assoc($this->result);
    }
    function fetch() {
        while ($this->data = mysql_fetch_assoc($this->result)) {
            $this->fetch = $this->data;
            return $this->fetch;
        }
    }
    function stop() {
        unset($this->data);
        unset($this->result);
        unset($this->fetch);
        unset($this->err);
        unset($this->query);
    }

}

?>
