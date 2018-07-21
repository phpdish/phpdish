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

final class MarkdownHelper
{
    /**
     * 从一段markdown字符内容中提取图.
     *
     * @param string $content
     *
     * @return array
     */
    public static function extractImages($content)
    {
        $images = [];
        if (preg_match_all('#\!\[.+\]\((.+)\)#', $content, $matches)) {
            $images = $matches[1];
        }

        return $images;
    }
}