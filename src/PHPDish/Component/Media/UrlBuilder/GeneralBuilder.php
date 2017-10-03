<?php

namespace PHPDish\Component\Media\UrlBuilder;

use Liip\ImagineBundle\Imagine\Cache\CacheManager as ImagineCacheManager;
use PHPDish\Component\Media\Model\ImageInterface;
use PHPDish\Component\Media\Model\MediaInterface;

class GeneralBuilder implements UrlBuilderInterface
{
    /**
     * 基本url
     * @var string
     */
    protected $baseUrl;

    protected $imagineCacheManager;

    public function __construct(ImagineCacheManager $cacheManager, $baseUrl)
    {
        $this->imagineCacheManager = $cacheManager;
        $this->baseUrl = '/' . trim($baseUrl,  '/')  . '/';
    }

    /**
     * {@inheritdoc}
     */
    public function build(MediaInterface $media)
    {
        return "{$this->baseUrl}{$media->getKey()}";
    }

    /**
     * {@inheritdoc}
     */
    public function buildImageResizeUrl(ImageInterface $image, $filter, $runtimeConfig = [])
    {
        return $this->imagineCacheManager->getBrowserPath($image->getKey(), $filter, $runtimeConfig);
    }
}