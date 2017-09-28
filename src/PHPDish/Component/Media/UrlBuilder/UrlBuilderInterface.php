<?php

namespace PHPDish\Component\Media\UrlBuilder;


use PHPDish\Component\Media\Model\MediaInterface;

interface UrlBuilderInterface
{
    /**
     * 为媒体文件创造url
     * @param MediaInterface $media
     * @return string
     */
    public function build(MediaInterface $media);
}