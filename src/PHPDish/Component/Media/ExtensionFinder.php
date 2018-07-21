<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Media;

final class ExtensionFinder
{
    /**
     * 从链接中查找扩展名
     *
     * @param string $url
     * @return false|string
     */
    public static function find($url)
    {
        return ltrim(strrchr(parse_url($url, PHP_URL_PATH), '.'), '.') ?: false;
    }
}