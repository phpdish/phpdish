<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CmsBundle\Utility;


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