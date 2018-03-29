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

interface ImageInterface extends FileInterface
{
    /**
     * Set image width in pixels.
     *
     * @param int $width Width
     *
     * @return $this Self object
     */
    public function setWidth($width);

    /**
     * Get image width in pixels.
     *
     * @return int
     */
    public function getWidth();

    /**
     * Set image height in pixels.
     *
     * @param int $width Width
     *
     * @return $this Self object
     */
    public function setHeight($width);

    /**
     * Get image height in pixels.
     *
     * @return int
     */
    public function getHeight();
}
