<?php

namespace PHPDish\Component\Media\UrlBuilder;

use PHPDish\Component\Media\Model\MediaInterface;

class GeneralBuilder implements UrlBuilderInterface
{
    /**
     * 基本url
     * @var string
     */
    protected $baseUrl;

    public function __construct($baseUrl)
    {
        $this->baseUrl = '/' . trim($baseUrl,  '/')  . '/';
    }

    /**
     * {@inheritdoc}
     */
    public function build(MediaInterface $media)
    {
        return "{$this->baseUrl}{$media->getKey()}";
    }
}