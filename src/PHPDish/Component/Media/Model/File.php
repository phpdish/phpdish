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

class File extends Media implements FileInterface
{
    /**
     * @var string
     *
     * Content Type
     */
    protected $contentType;

    /**
     * @var string
     *
     * Extension
     */
    protected $extension;

    /**
     * @var int
     *
     * Size
     */
    protected $size;

    /**
     * @var string
     *
     * Content
     */
    protected $content;

    public function __construct($key = null, $content = null)
    {
        $this->key = $key;
        $this->content = $content;
    }


    /**
     * Set the mime type of this media element.
     *
     * @param string $contentType Content type
     *
     * @return $this Self object
     */
    public function setContentType($contentType)
    {
        $this->contentType = $contentType;

        return $this;
    }

    /**
     * Get the mime type of this media element.
     *
     * @return string Content type
     */
    public function getContentType()
    {
        return $this->contentType;
    }

    /**
     * Set the extension of the file.
     *
     * @param string $extension Extension
     *
     * @return $this Self object
     */
    public function setExtension($extension)
    {
        $this->extension = $extension;

        return $this;
    }

    /**
     * Get the extension of the file.
     *
     * @return string Extension
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * Set the file size in bytes.
     *
     * @param int $size Size
     *
     * @return $this Self object
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get the file size in bytes.
     *
     * @return int Size
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set the content.
     *
     * @param string $content Content
     *
     * @return $this Self object
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get the content.
     *
     * @return string Content
     */
    public function getContent()
    {
        return $this->content;
    }
}
