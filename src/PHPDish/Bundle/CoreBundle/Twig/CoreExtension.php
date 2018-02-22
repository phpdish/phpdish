<?php

namespace PHPDish\Bundle\CoreBundle\Twig;

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
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('html_safe_chunk', [$this, 'safeChunk']),
        ];
    }

    public function safeChunk($html, $percent)
    {
        return $this->htmlChunker->chunk($html, $percent);
    }
}