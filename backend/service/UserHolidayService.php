<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 06.06.2018
 * Time: 17:24
 */
include_once (__DIR__."/../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/TimeSheetService.php");
include_once (__DIR__."/SimpleUserService.php");
include_once (__DIR__."/NotificationService.php");
include_once (__DIR__."/../model/Notification.php");
include_once (__DIR__."/../model/UserHoliday.php");
include_once (__DIR__."/../model/DayTimeSheet.php");
include_once (__DIR__."/../model/Notification.php");

include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class UserHolidayService extends Service
{

    /**
     * @param $id integer
     * @return UserHoliday
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findById($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return UserHoliday::findById($id);
	}

    /***
     * @param $id
     * @return UserHoliday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findByUserId($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND", $id)){
			throw new PermissionException();
		}
		return UserHoliday::findByUserId($id);
	}

    /**
     * @param int $id
     * @param int $year
     * @return UserHoliday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findAllByUserIdAndYear($id, $year){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND", $id)){
			throw new PermissionException();
		}
		return UserHoliday::findAllByUserIdAndYear($id, $year);
	}

    /**
     * @param int $id
     * @param int $year
     * @param int $month
     * @return UserHoliday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findAllByUserIdAndMonthAndYear($id, $year, $month){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND", $id)){
			throw new PermissionException();
		}
		$usersHoliday = UserHoliday::findAllByUserIdAndMonthAndYear($id, $year, $month);
		$usersHolidayArray = array();
		foreach ($usersHoliday as $holiday){
			$day = date("d", $holiday->getDate());
			$usersHolidayArray[$day] = $holiday;
		}
		return $usersHolidayArray;

	}


    /**
     * @return UserHoliday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findAll(){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return UserHoliday::findAll();
	}

    /**
     * @param UserHoliday[]|UserHoliday $userHolidays
     * @throws PermissionException
     * @throws Exception
     * @throws UnauthorizedException
     */
	public static function create($userHolidays){
        if(is_array($userHolidays)){
            if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.CREATE",
                $userHolidays[0]->getUserId())){
                throw new PermissionException();
            }
            if(sizeof($userHolidays) > 1){
                $first = $userHolidays[0];
                $last = $userHolidays[sizeof($userHolidays)-1];

                $simpleUser = SimpleUserService::findById($userHolidays[0]->getUserId());

                $notifi = new Notification();
                $notifi->setTitle("Vytvoření dovolené");
                $notifi->setDescription($simpleUser->displayFullName() . " si vytvořil dovolenou od " .
                    $first->getDate() . " do " . $last->getDate() . ".");
            }else{
                $simpleUser = SimpleUserService::findById($userHolidays[0]->getUserId());

                $notifi = new Notification();
                $notifi->setTitle("Vytvoření dovolené");
                $notifi->setDescription($simpleUser->displayFullName() . " si vytvořil dovolenou na" .
                    $userHolidays[0]->getDate() . ".");
            }
		    foreach ($userHolidays as $holiday){
            	if(UserHoliday::findByUserIdAndDate($userHolidays->getUserId(), $userHolidays->getDate())->getDate() !== null){
		            throw new Exception();
	            }
                UserHoliday::save($holiday);
            }
            Notification::save($notifi);

            TimeSheetService::reGenerateForHoliday($userHolidays[0]->getUserId(),$userHolidays);

        }else{
            if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.CREATE",  $userHolidays->getUserId())){
                throw new PermissionException();
            }
	        if(UserHoliday::findByUserIdAndDate($userHolidays->getUserId(), $userHolidays->getDate())->getDate() !== null){
		        throw new Exception();
	        }
            $simpleUser = SimpleUserService::findById($userHolidays->getUserId());

            $notifi = new Notification();
            $notifi->setTitle("Vytvoření dovolené");
            $notifi->setDescription($simpleUser->displayFullName() . " si vytvořil dovolenou na" .
                $userHolidays->getDate() . ".");

            UserHoliday::save($userHolidays);
            Notification::save($notifi);
            TimeSheetService::reGenerateForHoliday($userHolidays->getUserId(),array($userHolidays));
        }

	}


    /**
     * @param UserHoliday $userHoliday
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function update($userHoliday){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.UPDATE", $userHoliday->getUserId())){
			throw new PermissionException();
		}

		UserHoliday::save($userHoliday);

        $simpleUser = SimpleUserService::findById($userHoliday->getUserId());

        $notifi = new Notification();
        $notifi->setTitle("Aktualizace dovolené");
        $notifi->setDescription($simpleUser->displayFullName() . " si aktualizoval dovolenou pro den " .
            $userHoliday->getDate() . ".");

        Notification::save($notifi);

        TimeSheetService::reGenerateForHoliday($userHoliday->getUserId(),array($userHoliday));
	}


    /***
     * @param $id
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function deleteById($id){
        $userHoliday = self::findById($id);

		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.DELETE", $userHoliday->getUserId())){
			throw new PermissionException();
		}

		$day = date("d", strtotime($userHoliday->getDate()));
		$month = date('m', strtotime($userHoliday->getDate()));
		$year = date('Y', strtotime($userHoliday->getDate()));
		$dayTimeSheet =	DayTimeSheet::findByUserIdAndDate($userHoliday->getUserId(), $day, $month, $year);

		if($dayTimeSheet !== null){
            $dayTimeSheet->setDayType(NULL);
            DayTimeSheet::save($dayTimeSheet);
        }

        $simpleUser = SimpleUserService::findById($userHoliday->getUserId());

        $notifi = new Notification();
        $notifi->setTitle("Smazání dovolené");
        $notifi->setDescription($simpleUser->displayFullName() . " si smazal dovolenou pro den " .
            $userHoliday->getDate() . ".");

        Notification::save($notifi);

		UserHoliday::deleteById($id);
	}

	/**
	 * @param $jsonUserHoliday string
	 * @return UserHoliday|object
	 * @throws JsonMapper_Exception
	 */
	public static function jsonUserHolidayDecode($jsonUserHoliday){
		$mapper = new JsonMapper();
		$userHoliday = $mapper->map(json_decode($jsonUserHoliday), new UserHoliday());
		return $userHoliday;
	}

    /**
     * @param $jsonHoliday string
     * @return UserHoliday[]|object[]
     */
    public static function jsonHolidayArrayDecode( $jsonHoliday){
        $mapper = new JsonMapper();
        $holidays = $mapper->mapArray(json_decode($jsonHoliday), array(), 'UserHoliday');
        return $holidays;
    }
}