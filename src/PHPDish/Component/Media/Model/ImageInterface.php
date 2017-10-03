<?php

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

    public function setResizeUrl($url);

    public function getResizeUrl($width, $height);
}