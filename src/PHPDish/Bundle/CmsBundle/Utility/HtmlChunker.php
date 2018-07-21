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

/**
 * Html Chunker
 */
class HtmlChunker
{
    /**
     * @var \HTMLPurifier
     */
    protected $HTMLPurifier;

    public function __construct(\HTMLPurifier $htmlPlurifier)
    {
        $this->HTMLPurifier = $htmlPlurifier;
    }

    /**
     * 无损截取html
     *
     * @param string $html
     * @param float $percent
     * @return string
     */
    public function chunk($html, $percent)
    {
        $totalLength = mb_strlen($html);
        $reservedLength = intval($totalLength * $percent);
        $chunkHtml = mb_substr($html, 0, $reservedLength, 'utf-8');
        $junkTagPattern = '#<img[^>]+$#';
        //如果有垃圾标签，则先补全垃圾标签
        if (preg_match($junkTagPattern, $chunkHtml)) {
            if (preg_match('#[^<]+(?=>)#U', mb_substr($html, $reservedLength), $matches)) {
                $chunkHtml .= $matches[0] . '>';
            }
        }
//        dump($chunkHtml);
//        dump($html);
        return $this->HTMLPurifier->purify($chunkHtml);
    }
}