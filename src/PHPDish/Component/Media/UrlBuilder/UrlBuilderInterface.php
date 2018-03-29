<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Component\Media\UrlBuilder;

use PHPDish\Component\Media\Model\ImageInterface;
use PHPDish\Component\Media\Model\MediaInterface;

interface UrlBuilderInterface
{
    /**
     * 为媒体文件创造url.
     *
     * @param MediaInterface|string $media
     *
     * @return string
     */
    public function build($media);

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
