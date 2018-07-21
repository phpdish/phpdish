<?php

namespace PHPDish\Component\Core\BodyProcessor;

use Emojione\Emojione;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use PHPDish\Component\Mention\MentionParserInterface;

class BodyProcessor implements BodyProcessorInterface
{
    /**
     * @var MarkdownParserInterface
     */
    protected $markdownParser;

    /**
     * @var MentionParserInterface
     */
    protected $mentionParser;

    /**
     * @var \HTMLPurifier
     */
    protected $htmlPurifier;

    public function __construct(
        MarkdownParserInterface $markdownParser,
        MentionParserInterface $mentionParser,
        \HTMLPurifier $htmlPurifier
    )
    {
        $this->markdownParser = $markdownParser;
        $this->mentionParser = $mentionParser;
        $this->htmlPurifier = $htmlPurifier;
    }

    /**
     * {@inheritdoc}
     */
    public function process($body)
    {
        $body = $this->markdownParser->transformMarkdown($body);
        $body = $this->htmlPurifier->purify($body); //先过滤标签
        $parsedBody = $this->mentionParser->parse($body)->getParsedBody();
        return Emojione::getClient()->shortnameToUnicode($parsedBody);
    }

    /**
     * {@inheritdoc}
     */
    public function getMarkdownParser()
    {
        return $this->markdownParser;
    }

    /**
     * {@inheritdoc}
     */
    public function getMentionParser()
    {
        return $this->mentionParser;
    }
}