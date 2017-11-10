<?php

namespace PHPDish\Component\Util;


final class StringManipulator
{
    /**
     * 清楚换行符
     * @param $string
     * @return string
     */
    public static function stripLineBreak($string)
    {
        return preg_replace("/[\n|\r]/",  '', $string);
    }
}