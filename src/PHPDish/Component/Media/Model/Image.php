<?php

namespace PHPDish\Component\Media\Model;

/**
 * Class Image.
 */
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

    protected $resizeUrl;

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

    public function setResizeUrl($url)
    {
        $this->resizeUrl = $url;
    }

    public function getResizeUrl($width, $height)
    {
        return $this->resizeUrl;
    }
}
