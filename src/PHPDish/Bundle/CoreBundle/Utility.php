<?php

namespace PHPDish\Bundle\CoreBundle;

class Utility
{
    /**
     * 从一段markdown字符内容中提取图.
     *
     * @param string $content
     *
     * @return array
     */
    public static function extractImagesFromMarkdown($content)
    {
        $images = [];
        if (preg_match_all('#\!\[.+\]\((.+)\)#', $content, $matches)) {
            $images = $matches[1];
        }

        return $images;
    }
}
