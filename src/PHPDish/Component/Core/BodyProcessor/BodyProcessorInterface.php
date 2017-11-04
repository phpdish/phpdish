<?php

namespace PHPDish\Component\Core\BodyProcessor;

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