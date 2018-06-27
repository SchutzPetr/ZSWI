<?php
/**
 * Created by PhpStorm.
 * User: schut
 * Date: 13.06.2018
 * Time: 22:35
 */

class Utils
{

    /**
     * @param $from string
     * @param $to string
     * @param $fromBorder string
     * @param $toBorder string
     * @return bool
     */
    public static function isBetweenDate($from, $to, $fromBorder, $toBorder)
    {
        $fromDate = date('Y-m-d', strtotime($from));
        $toDate = date('Y-m-d', strtotime($to));;
        $fromBorderDate = date('Y-m-d', strtotime($fromBorder));
        $toBorderDate = date('Y-m-d', strtotime($toBorder));

        return ($fromDate > $fromBorderDate) && ($toDate < $toBorderDate);
    }

    /**
     * @param string $haystack
     * @param string $needle
     * @return bool
     */
    public static function startsWith($haystack, $needle)
    {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }
}