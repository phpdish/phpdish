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

namespace PHPDish\Component\Media\Namer;

interface NamerInterface
{
    /**
     * 为文件对象生成存储键值
     *
     * @param \SplFileInfo $file
     *
     * @return string
     */
    public function transform(\SplFileInfo $file);

    /**
     * 从资源的url生成存储键.
     *
     * @param string $url
     *
     * @return string
     */
    public function transformFromUrl($url);

    /**
     * 生成带有指定扩展名的随机存储键.
     *
     * @param string $extension
     *
     * @return string
     */
    public function transformWithExtension($extension);
}
