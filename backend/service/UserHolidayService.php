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
include_once (__DIR__."/../model/UserHoliday.php");
include_once (__DIR__."/../model/DayTimeSheet.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");


class UserHolidayService extends Service
{

	/**
	 * @param $id integer
	 * @return UserHoliday
	 * @throws PermissionException
	 */
	public static function findById($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return UserHoliday::findById($id);
	}

	/***
	 * @param $id
	 * @return UserHoliday
	 * @throws PermissionException
	 */
	public static function findByUserId($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}
		return UserHoliday::findByUserId($id);
	}

	/**
	 * @param int $id
	 * @param int $year
	 * @return UserHoliday
 	 * @throws PermissionException
	 */
	public static function findAllByUserIdAndYear($id, $year){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
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
	 */
	public static function findAllByUserIdAndMonthAndYear($id, $year, $month){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}
		$usersHoliday = UserHoliday::findAllByUserIdAndMonthAndYear($id, $year, $month);
		$usersHolidayArray = array();
		foreach ($usersHoliday as $holiday){
			$day = date("d", $holiday->getDay());
			$usersHolidayArray[$day] = $holiday;
		}
		return $usersHolidayArray;

	}


		/**
	 * @return UserHoliday[]
	 * @throws PermissionException
	 */
	public static function findAll(){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return UserHoliday::findAll();
	}

	/**
	 * @param UserHoliday $userHoliday
	 * @throws PermissionException
	 */
	public static function create($userHoliday){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.CREATE")){
			throw new PermissionException();
		}
		UserHoliday::save($userHoliday);
		$day = date("d", $userHoliday->getDay());
		$month = date('m', $userHoliday->getDay());
		$year = date('Y', $userHoliday->getDay());
		$dayTimeSheet =	DayTimeSheet::findByUserIdAndDate($userHoliday->getUserId(), $day, $month, $year);
		$dayTimeSheet->setDayType("HOLIDAY");
		DayTimeSheet::save($dayTimeSheet);
	}

	/**
	 * @param UserHoliday $userHoliday
	 * @throws PermissionException
	 */
	public static function update($userHoliday){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.UPDATE")){
			throw new PermissionException();
		}

		UserHoliday::save($userHoliday);
	}


	/***
	 * @param $id
	 * @throws PermissionException
	 */
	public static function deleteById($id){
		if(!Permission::hasPermission(self::getUserFromContext(), "USER_HOLIDAY.DELETE")){
			throw new PermissionException();
		}
		$userHoliday = self::findById($id);
		$day = date("d", $userHoliday->getDay());
		$month = date('m', $userHoliday->getDay());
		$year = date('Y', $userHoliday->getDay());
		$dayTimeSheet =	DayTimeSheet::findByUserIdAndDate($userHoliday->getUserId(), $day, $month, $year);
		$dayTimeSheet->setDayType(NULL);
		DayTimeSheet::save($dayTimeSheet);

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
}