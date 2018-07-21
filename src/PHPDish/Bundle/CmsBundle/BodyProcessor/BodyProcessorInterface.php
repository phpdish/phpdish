<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CmsBundle\BodyProcessor;

use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use PHPDish\Component\Mention\MentionParserInterface;

interface BodyProcessorInterface
{
    /**
     * 预处理文本
     *
     * @param string $body
     * @return string
     */
    public function process($body);

    /**
     * 获取mention parser
     * @return MentionParserInterface
     */
    public function getMentionParser();

    /**
     * 获取markdown parser
     * @return MarkdownParserInterface
     */
    public function getMarkdownParser();
}