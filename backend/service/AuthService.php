<?php

include_once(__DIR__ . "/../exception/PermissionException.php");
include_once(__DIR__ . "/../exception/UnauthorizedException.php");
include_once(__DIR__ . "/../util/Permission.php");
include_once(__DIR__ . "/../database/Database.php");
include_once(__DIR__ . "/Service.php");
include_once(__DIR__ . "/UserService.php");
include_once(__DIR__ . "/../model/Attendance.php");
include_once (__DIR__."/../model/User.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once(__DIR__ . "/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class AuthService extends Service
{

    /**
     * @param string $login
     * @param string $password
     * @return string
     * @throws UnauthorizedException
     */
    public static function simpleLogin($login, $password)
    {

        $query = "SELECT user_id, password, token, valid FROM user_authentication WHERE user_id = (SELECT id FROM user WHERE orion_login = :login) LIMIT 1;";

		$preparedQuery = Database::getConnection()->prepare($query);
		$preparedQuery->bindValue(":login", $login);
		$preparedQuery->execute();
		$result = $preparedQuery->fetch();

		if(empty($result)){
            throw new UnauthorizedException();
        }

		if(!password_verify($password,$result["password"])){
		    throw new UnauthorizedException();
        }

        $db_user_id = $result["user_id"];
        $db_token = $result["token"];
        $db_valid = $result["valid"];

        if(is_null($db_token) || strtotime($db_valid) >= strtotime("now") ){
            $token = urlencode(password_hash(self::generateUUID(), PASSWORD_DEFAULT));
            $valid = date("Y-m-d",strtotime("+7 day"));

            $query = "UPDATE user_authentication SET token = :token, valid = :valid WHERE user_id = :user_id;";
            $preparedQuery = Database::getConnection()->prepare($query);
            $preparedQuery->bindValue(":user_id", $db_user_id);
            $preparedQuery->bindValue(":token", $token);
            $preparedQuery->bindValue(":valid", $valid);

            $preparedQuery->execute();

            return $token;
        }else{
            return $db_token;
        }
    }

    /**
     * @param string $token
     * @return User
     * @throws UnauthorizedException
     * @throws PermissionException
     */
    public static function findUserByToken($token){
        if(Service::getTokenFromHeader() !== $token){
            throw new PermissionException();
        }
        $query = "SELECT user_id FROM user_authentication WHERE token LIKE :token LIMIT 1;";

        $preparedQuery = Database::getConnection()->prepare($query);
        $preparedQuery->bindValue(":token", $token);
        $preparedQuery->execute();
        $result = $preparedQuery->fetch();

        if(empty($result)){
            throw new UnauthorizedException();
        }
        $user = User::findById($result["user_id"]);
        if(is_null($user)){
            throw new UnauthorizedException();
        }
        return $user;
    }

    /**
     * @param string $token
     * @return User
     * @throws UnauthorizedException
     * @throws PermissionException
     */
    public static function authUserByToken($token){
        return self::findUserByToken($token);
    }

    public static function generateUUID()
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),

            // 16 bits for "time_mid"
            mt_rand(0, 0xffff),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand(0, 0x0fff) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand(0, 0x3fff) | 0x8000,

            // 48 bits for "node"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}
