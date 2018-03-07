<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Twig;

use Doctrine\Common\Collections\Criteria;
use Emojione\Emojione;
use PHPDish\Component\Util\HtmlChunker;

class CoreExtension extends \Twig_Extension
{
    /**
     * @var HtmlChunker
     */
    protected $htmlChunker;

    public function __construct(HtmlChunker $htmlChunker)
    {
        $this->htmlChunker = $htmlChunker;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters(): array
    {
        return [
            new \Twig_SimpleFilter('html_safe_chunk', [$this, 'safeChunk']),
            new \Twig_SimpleFilter('emoji_short_to_unicode', [$this, 'emojiShortNameToUnicode']),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            //Criteria
            new \Twig_SimpleFunction('criteria_create', [Criteria::class, 'create']),
            new \Twig_SimpleFunction('criteria_expr', [Criteria::class, 'expr'])
        ];
    }

    /**
     * 安全裁切 html
     * @param string $html
     * @param float $percent
     * @return string
     */
    public function safeChunk(string $html, float $percent): string
    {
        return $this->htmlChunker->chunk($html, $percent);
    }

    /**
     * emoji短语转换为unicode
     * @param string $string
     * @return string
     */
    public function emojiShortNameToUnicode(string $string) :string
    {
        return Emojione::getClient()->shortnameToUnicode($string);
    }
}