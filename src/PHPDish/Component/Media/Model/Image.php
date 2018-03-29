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

class Image extends File implements ImageInterface
{
    /**
     * @var int
     *
     * Width
     */
    protected $width;

    /**
     * @var int
     *
     * Height
     */
    protected $height;

    /**
     * Set image width in pixels.
     *
     * @param int $width Width
     *
     * @return $this Self object
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get image width in pixels.
     *
     * @return int Width
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * Set image height in pixels.
     *
     * @param int $height Height
     *
     * @return $this Self object
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get image height in pixels.
     *
     * @return int Height
     */
    public function getHeight()
    {
        return $this->height;
    }
}
