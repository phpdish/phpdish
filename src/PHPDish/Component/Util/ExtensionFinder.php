<?php

namespace PHPDish\Component\Util;

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