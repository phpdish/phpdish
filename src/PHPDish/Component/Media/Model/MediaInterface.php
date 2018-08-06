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

namespace PHPDish\Component\Media\Model;

interface MediaInterface
{
    /**
     * Set key
     *
     * @param string $key
     * @return $this
     */
    public function setKey($key);

    /**
     * 获取媒体文件的key.
     *
     * @return string
     */
    public function getKey();

    /**
     * 获取媒体资源文件名
     *
     * @return string
     */
    public function getName();

    /**
     * Set the content.
     *
     * @param string|resource $content Content
     *
     * @return $this Self object
     */
    public function setContent($content);

    /**
     * Get the content.
     *
     * @return string|resource Content
     */
    public function getContent();
}
