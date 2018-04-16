<?php
//defined('INDEX') OR die('Прямой доступ к странице запрещён!');

include_once("User.php");
include_once("constant.php");

// MYSQL
class DataBase
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

	///////////////////////////////////   SHEDULE   // ////////////////////////////////////////////////////////////////////////////

	/***
	 * add one shedule in one day
	 * @param $id
	 * @param $day
	 * @param $is_nemoc
	 * @param $is_vacation
	 * @param $other
	 * @param $from_1
	 * @param $to_1
	 * @param $from_2
	 * @param $to_2
	 * @param $from_3
	 * @param $to_3
	 *
	 * @return bool
	 */
	function addSheduleByUserID($id, $day, $is_nemoc, $is_vacation, $other, $from_1, $to_1, $from_2, $to_2, $from_3, $to_3){
		$mysql_pdo_error = false;
		$query = 'INSERT INTO shedule (day, is_nemoc, is_vacation, other, from_1, to_1, from_2, to_2, user_id) 
VALUES (:day, :is_nemoc, :is_vacation, :other, :from_1, :to_1, :from_2, :to_2, :id)';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':day', $day);
		$sth->bindValue(':is_nemoc', $is_nemoc);
		$sth->bindValue(':is_vacation', $is_vacation);
		$sth->bindValue(':other', $other);
		$sth->bindValue(':from_1', $from_1);
		$sth->bindValue(':to_1', $to_1);
		$sth->bindValue(':from_2', $from_2);
		$sth->bindValue(':to_2', $to_2);
//	    $sth->bindValue(':from_3', $from_3);
//	    $sth->bindValue(':to_3', $to_3);
		$sth->bindValue(':id', $id);
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

	function isGenerateSheduleInDayByUserId($id, $day){
		$mysql_pdo_error = false;
		$query = "select * from shedule WHERE  day=:day AND user_id=:user_id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':user_id', $id, PDO::PARAM_INT);
		$sth->bindValue(':day', $day , PDO::PARAM_STR);
		$sth->execute();
		$errors = $sth->errorInfo();
		if ($errors[0] + 0 > 0){
			$mysql_pdo_error = true;
		}
		if ($mysql_pdo_error == false){
			$all = $sth->fetchAll(PDO::FETCH_ASSOC);
			if(count($all) > 0){
				return true;
			}
			return false;
		}
		else{
			//TODO other error
			echo "Eror - PDOStatement::errorInfo(): ";
			print_r($errors);
			echo "SQL : $query";
		}

	}

	function generateMonthSheduleForUser($id, $month, $year){
		$arrayHolodaysInMonth = $this->getAllHolidaysInMonth($month, $year);
		$arrayVacationsInMonth = $this->getVacationByUserInMonth($id, $month, $year);
		$time = $this->getTimeTableByUserID($id);

	    $day = FIRST_DAY;
	    $d = mktime(0, 0, 0, $month, $day, $year);
	    $lastDayInMonth = date("t", strtotime($d));
		for($day; $day<$lastDayInMonth; $day++){
			$d = mktime(0, 0, 0, $month, $day, $year);
			//is it not a saturday or sunday
			if( date('w', $d)>0 && date('w', $d)<6){
				$dayInMonth = date("Y-m-d", $d);
				if(!$this->isGenerateSheduleInDayByUserId($id, $dayInMonth)){
					//is it not a hollidays
					if(!$this->isItHollidays($dayInMonth, $arrayHolodaysInMonth)){
						//is it not a vacation
						if(!$this->isItVacationDay($dayInMonth, $arrayVacationsInMonth)){
							$this->addSheduleByUserID($id, $dayInMonth, 0,0, "",
								$time[0]["from_1"], $time[0]["to_1"], $time[0]["from_2"], $time[0]["to_2"], $time[0]["from_3"], $time[0]["to_3"]);
							//TODO Control time 3

						}else{//if is it a vacation
							//TODO type control
//						if($arrayVacationsInMonth[$dayInMonth]->type == '0.5'){
//
//						}
							$this->addSheduleByUserID($id, $dayInMonth, 0,1, "",
								$time[0]["from_1"], $time[0]["to_1"], null, null, $time[0]["from_3"], $time[0]["to_3"]);

						}
					}
				}
			}
		}
    }

	function getSheduleUserByMonthAndYear($month, $year, $user_id){
//		$day = 1;
//		$d = mktime(0, 0, 0, $month, $day, $year);
//
//		$dayFrom = date("d.m.Y", $d);
//		$dayTo = date("d.m.Y", strtotime($d));

		$mysql_pdo_error = false;
		$query = "select *  from shedule WHERE  MONTH(day) =:month AND YEAR(day) =:year AND user_id=:user_id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$sth->bindValue(':month', $month, PDO::PARAM_INT);
		$sth->bindValue(':year', $year, PDO::PARAM_INT);

//		$sth->bindValue(':day_from', $dayFrom, PDO::PARAM_STR);
//		$sth->bindValue(':day_to', $dayTo, PDO::PARAM_STR);
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

	function getSheduleById($id){
		$mysql_pdo_error = false;
		$query = "select *  from shedule WHERE  id=:id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);
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


	function updateSheduleById($id, $day, $is_nemoc, $is_vacation, $other, $from_1, $to_1, $from_2, $to_2, $from_3, $to_3){
		$mysql_pdo_error = false;
		$query = 'UPDATE shedule SET day =:day, is_nemoc=:is_nemoc,
 								  is_vacation=:is_vacation, other:=other
 								  from_1=:from_1, to_1=:to_1, from_2=:from_2 , to_2=:to_2
 								  where id=:user_id;';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':day', $day);
		$sth->bindValue(':is_nemoc', $is_nemoc);
		$sth->bindValue(':is_vacation', $is_vacation);
		$sth->bindValue(':other', $other);
		$sth->bindValue(':from_1', $from_1);
		$sth->bindValue(':to_1', $to_1);
		$sth->bindValue(':from_2', $from_2);
		$sth->bindValue(':to_2', $to_2);
//	    $sth->bindValue(':from_3', $from_3);
//	    $sth->bindValue(':to_3', $to_3);
		$sth->bindValue(':id', $id);
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

	function deleteSheduleById($id){
		$mysql_pdo_error = false;
		$query = 'DELETE FROM shedule WHERE where id=:id';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);
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

	///////////////////////////////////   USER   // ////////////////////////////////////////////////////////////////////////////

	function getUserByLogin($login, $pass ){
		$mysql_pdo_error = false;
		$query = "select *  from user where orion_login=:login";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':login', $login, PDO::PARAM_STR);
//		$sth->bindValue(':pass', $pass, PDO::PARAM_STR);

		$sth->execute();
		$errors = $sth->errorInfo();
		if ($errors[0] + 0 > 0){
			$mysql_pdo_error = true;
		}
		if ($mysql_pdo_error == false){
			$all = $sth->fetchAll(PDO::FETCH_ASSOC);
//			$user = new User();
//			$user->fill($all[0]);
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

	/***
	 * return object User
	 * @param $id
	 *
	 * @return User
	 */
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

	function updateUser($user){
	    $mysql_pdo_error = false;
	    $query = 'UPDATE user SET name =:users_name, lastname=:users_lastname,
 								  honorific_prefix=:users_honorific_prefix,honorific_suffix:=users_honorific_suffix
 								  authority=:users_authority, is_active=:users_is_active, main_work_station=:users_main_work_station  
 								  where id=:user_id;';
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':user_id', $user->id);
	    $sth->bindValue(':users_name', $user->name);
	    $sth->bindValue(':users_lastname', $user->lastname);
	    $sth->bindValue(':users_honorific_prefix', $user->honorific_prefix);
	    $sth->bindValue(':users_honorific_suffix', $user->honorific_suffix);
	    $sth->bindValue(':users_authority', $user->authority);
	    $sth->bindValue(':users_is_active', $user->is_active);
	    $sth->bindValue(':users_main_work_station', $user->main_work_station);

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

	//TODO pereprover
	function getAllSheduleInMonthByUserID($id, $month, $year){
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

    ///////////////////////////////////   PROJECTS  ////////////////////////////////////////////////////////////////////////////

    function addProjectsByUser($user_id, $ntis, $kiv, $project_1, $project_1_name, $project_2, $project_2_name, $date){
	    $mysql_pdo_error = false;
	    $query = 'INSERT INTO users_project (KIV, NTIS, project_1_name, project_1, project_2_name, project_2, active_from, user_id) 
VALUES (:ntis, :kiv ,:project_1_name, :project_1, :project_2_name, project_2, :active_from, :id)';
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':ntis', $ntis);
	    $sth->bindValue(':kiv', $kiv);
	    $sth->bindValue(':project_1', $project_1);
	    $sth->bindValue(':project_1_name', $project_1_name);
	    $sth->bindValue(':project_2', $project_2);
	    $sth->bindValue(':project_2_name', $project_2_name);
	    $sth->bindValue(':active_from', date("Y-m-d"), $date);
	    $sth->bindValue(':id', $user_id);
	    $sth->execute();//insert to db
	    $errors = $sth->errorInfo();
	    echo $sth->errorCode() ;
	    if ($errors[0] > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    //all is ok
		    echo "all is ok \n";
		    return true;
	    }else{
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }

    }

    function getLastProjectsUserById($id){
	    $mysql_pdo_error = false;
	    $query = "select *  from users_project WHERE user_id=:id AND active_from IN (SELECT MAX(active_from) from users_project)";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':id', $id, PDO::PARAM_INT);
	    $sth->execute();
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    $all = $sth->fetchAll(PDO::FETCH_ASSOC);
		    //TODO will be problem with other rate in one month
		    return $all;
	    }
	    else{
		    //TODO other error
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }

    }

    function getTypeContract($id){
	    $array = $this->getLastProjectsUserById($id);
	    $number = $array[0]->KIV+ $array[0]->NTIS+ $array[0]->project_1+ $array[0]->project_2;
		return $number;
    }

    function getProjectsUserInMonth($id, $month, $year){
	    $mysql_pdo_error = false;
	    $query = "select *  from users_project WHERE user_id=:id AND MONTH(day) =:month AND YEAR(day) =:year";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':id', $id, PDO::PARAM_INT);
	    $sth->bindValue(':month', $month, PDO::PARAM_INT);
	    $sth->bindValue(':year', $year, PDO::PARAM_INT);
	    $sth->execute();
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    $all = $sth->fetchAll(PDO::FETCH_ASSOC);
		    //TODO will be problem with other rate in one month
		    return $all;
	    }
	    else{
		    //TODO other error
		    echo "Eror - PDOStatement::errorInfo(): ";
		    print_r($errors);
		    echo "SQL : $query";
	    }
    }

    //////////////////////////////////   TIME     //////////////////////////////////////////////////////////////////////////////


	function addTimeTableByUserID($id, $from_1, $to_1, $from_2, $to_2){
		$mysql_pdo_error = false;
		$query = 'INSERT INTO time_table (from_1, to_1, from_2, to_2,  active_from, user_id) 
VALUES (:from_1, :to_1 ,:from_2, :to_2, :active_from, :id)';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':from_1', $from_1);
		$sth->bindValue(':to_1', $to_1);
		$sth->bindValue(':from_2', $from_2);
		$sth->bindValue(':to_2', $to_2);
//	    $sth->bindValue(':from_3', $from_3);
//	    $sth->bindValue(':to_3', $to_3);
		$sth->bindValue(':active_from', date("Y-m-d"));
		$sth->bindValue(':id', $id);
		$sth->execute();//insert to db
		$errors = $sth->errorInfo();
		echo $sth->errorCode() ;
		if ($errors[0] > 0){
			$mysql_pdo_error = true;
		}
		if ($mysql_pdo_error == false){
			//all is ok
			echo "all is ok \n";
			return true;
		}else{
			echo "Eror - PDOStatement::errorInfo(): ";
			print_r($errors);
			echo "SQL : $query";
		}
	}

	function getTimeTableByUserID($id){
		$mysql_pdo_error = false;
		$query = "select * from time_table WHERE user_id=:id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);
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
	 * @param $time array
	 *
	 * @return bool
	 */
    function updateTimeTable($time){
	    $mysql_pdo_error = false;
	    $query = 'UPDATE time_table SET from_1 =:from_1, to_1=:to_1,
 								  from_2=:from_2,to_2:=to_2, active_from:=active_from
 								  where user_id=:user_id;';
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':user_id', $time->user_id);
	    $sth->bindValue(':from_1', $time->timeFrom1);
	    $sth->bindValue(':to_1', $time->timeTo1);
	    $sth->bindValue(':from_2', $time->timeFrom2);
	    $sth->bindValue(':active_from', date("Y-m-d h:i:sa"));
	    $sth->bindValue(':to_2', $time->timeTo2);

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

	///////////////////////////////////   VACATION ////////////////////////////////////////////////////////////////////////////

	/***
	 * Function don`t have control shedule user, control must be in other file
	 * @param $day
	 * @param $type
	 * @param $user_id
	 *
	 * @return bool
	 */
	function addVacationToUser($day, $type ,$user_id){
		$mysql_pdo_error = false;
		$query = 'INSERT INTO vacation (day, type, user_id) VALUES (:day, :type, :user_id)';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':day', $day);
		$sth->bindValue(':type', $type);
		$sth->bindValue(':user_id', $user_id);

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

	function getVacationByUserInMonth($id, $month, $year){
	    $mysql_pdo_error = false;
	    $query = "select *  from vacation WHERE  MONTH(day) =:month AND YEAR(day) =:year AND user_id=:id";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':id', $id, PDO::PARAM_INT);
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

    function getVacationHourInYear($id, $year){
		$number = 0;
//		$contractNumber = $this->getTypeContract($id);
		$array = $this->getVacationByUserInYear($id, $year);
		for($i =0; $i<count($array); $i++){
			$number =+$array[$i]["type"];
		}

		return $number;
    }

	function getVacationByUserInYear($id, $year){
		$mysql_pdo_error = false;
		$query = "select *  from vacation WHERE YEAR(day) =:year AND user_id=:id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);
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


	function getVacationByID($id){
		$mysql_pdo_error = false;
		$query = "select * from vacation where id=:id";
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);

		$sth->execute();
		$errors = $sth->errorInfo();
		if ($errors[0] + 0 > 0){
			$mysql_pdo_error = true;
		}
		if ($mysql_pdo_error == false){
			$all = $sth->fetchAll(PDO::FETCH_ASSOC);
			return $all[0];
		}
		else{
			//TODO other error
			echo "Eror - PDOStatement::errorInfo(): ";
			print_r($errors);
			echo "SQL : $query";
		}


	}

	/***
	 * TODO generate shedule when delete vacation day
	 * @param $id
	 *
	 * @return bool
	 */
	function deleteVacationByID($id){
		$mysql_pdo_error = false;
		$query = 'DELETE FROM vacation WHERE where id=:id';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':id', $id, PDO::PARAM_INT);
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


	//////////////////////////////////////////////////   HOLIDAYS    ////////////////////////////////////////////

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

    function getHolidayByDay($day){
	    $mysql_pdo_error = false;
	    $query = "select *  from holidays WHERE  day=:day";
	    $sth = $this->conn->prepare($query);
	    $sth->bindValue(':day', $day, PDO::PARAM_STR);
	    $sth->execute();
	    $errors = $sth->errorInfo();
	    if ($errors[0] + 0 > 0){
		    $mysql_pdo_error = true;
	    }
	    if ($mysql_pdo_error == false){
		    $all = $sth->fetchAll(PDO::FETCH_ASSOC);
		    return $all[0];
	    }
	    else{
		    //TODO other error
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

	function updateHollidays($data){
		$mysql_pdo_error = false;
		$query = 'UPDATE hollidays SET day =:day, name=:name
 								  where id=:id;';
		$sth = $this->conn->prepare($query);
		$sth->bindValue(':day', $data->day);
		$sth->bindValue(':name', $data->name);
		$sth->bindValue(':id', $data->id);
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
	 * if day is in array return true
	 * @param $day
	 * @param $arrayHollidays
	 *
	 * @return bool
	 */
	function isItHollidays($day, $arrayHollidays){
		if( count($arrayHollidays) > 0){
			for($i=0; $i<count($arrayHollidays); $i++){
				if( $arrayHollidays[$i]["day"] == $day){
					return true;
				}
			}
		}
		return false;
	}

	/***
	 * if day is in array return true
	 * @param $day
	 * @param $arrayVacation
	 *
	 * @return bool
	 */
	function isItVacationDay($day, $arrayVacation){
		if(count($arrayVacation)>0){
			for($i=0; $i<count($arrayVacation); $i++){
				if($arrayVacation[$i]["day"]==$day){
					return true;
				}
			}
		}
		return false;
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
