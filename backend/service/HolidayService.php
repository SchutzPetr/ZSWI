<?php
/**
 * Created by PhpStorm.
 * User: Mari
 * Date: 14.06.2018
 * Time: 21:58
 */

include_once (__DIR__."/../exception/PermissionException.php");
include_once (__DIR__."/../util/Permission.php");
include_once (__DIR__."/Service.php");
include_once (__DIR__."/../model/Holiday.php");
include_once (__DIR__."./../vendor/netresearch/jsonmapper/src/JsonMapper.php");
include_once (__DIR__."/../vendor/netresearch/jsonmapper/src/JsonMapper/Exception.php");

class HolidayService extends Service
{

    /**
     * @param Holiday $holiday
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function create($holiday){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.CREATE")){
			throw new PermissionException();
		}

		Holiday::save($holiday);
	}

    /**
     * @param Holiday $holiday
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function update($holiday){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.CREATE")){
			throw new PermissionException();
		}
		Holiday::save($holiday);
	}

    /***
     * @param $year
     * @param $month
     * @param $day
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function deleteByDay($year, $month, $day){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.DELETE")){
			throw new PermissionException();
		}
		Holiday::deleteByDay($year, $month, $day);
	}

    /**
     * @return Holiday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findAll(){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return Holiday::findAll();
	}

    /***
     * @param $year
     * @param $month
     * @param $day
     * @return bool
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function isPublicHoliday($year, $month, $day){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return Holiday::findByYearMonthAndDay($year, $month, $day) != null;

	}

    /***
     * @param $year integer
     * @param $month integer
     * @param $day integer
     * @return Holiday|null
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findByYearMonthAndDay($year, $month, $day){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return Holiday::findByYearMonthAndDay($year, $month, $day);
	}

    /**
     * @param $month integer
     * @param $year integer
     * @return Holiday[]
     * @throws PermissionException
     * @throws UnauthorizedException
     */
	public static function findAllByMonthAndYear($year, $month){
		if(!Permission::hasPermission(self::getUserFromContext(), "HOLIDAY.FIND")){
			throw new PermissionException();
		}

		return Holiday::findAllByMonthAndYear($year, $month);
	}

	/**
	 * @param $jsonHoliday string
	 * @return Holiday|object
	 * @throws JsonMapper_Exception
	 */
	public static function jsonHolidayDecode( $jsonHoliday){
		$mapper = new JsonMapper();
		$holiday = $mapper->map(json_decode( $jsonHoliday), new Holiday());
		return $holiday;
	}

}