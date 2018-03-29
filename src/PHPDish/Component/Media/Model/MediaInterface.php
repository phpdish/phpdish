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
     * Set path.
     *
     * @param string $path Path to file
     *
     * @return $this Self object
     */
    public function setPath($path);

    /**
     * Get path.
     *
     * @return string Path
     */
    public function getPath();
}
