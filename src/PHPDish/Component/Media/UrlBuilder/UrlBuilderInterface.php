<?php

namespace PHPDish\Component\Media\UrlBuilder;

use PHPDish\Component\Media\Model\ImageInterface;
use PHPDish\Component\Media\Model\MediaInterface;

interface UrlBuilderInterface
{
    /**
     * 为媒体文件创造url.
     *
     * @param MediaInterface $media
     *
     * @return string
     */
    public function build(MediaInterface $media);

    /**
     * 给图片生成resize url.
     *
     * @param ImageInterface $image
     * @param string         $filter
     * @param array          $runtimeConfig
     *
     * @return string
     */
    public function buildImageResizeUrl(ImageInterface $image, $filter, $runtimeConfig = []);
}
