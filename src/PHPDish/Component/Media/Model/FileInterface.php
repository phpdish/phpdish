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

interface FileInterface extends MediaInterface
{
    /**
     * Set the mime type of this media element.
     *
     * @param string $contentType Content type
     *
     * @return $this Self object
     */
    public function setContentType($contentType);

    /**
     * Get the mime type of this media element.
     *
     * @return string
     */
    public function getContentType();

    /**
     * Set the extension of the file.
     *
     * @param string $extension Extension
     *
     * @return $this Self object
     */
    public function setExtension($extension);

    /**
     * Get the extension of the file.
     *
     * @return string
     */
    public function getExtension();

    /**
     * Set the file size in bytes.
     *
     * @param string $size Size
     *
     * @return $this Self object
     */
    public function setSize($size);

    /**
     * Get the file size in bytes.
     *
     * @return int Size
     */
    public function getSize();

    /**
     * Set the content.
     *
     * @param string $content Content
     *
     * @return $this Self object
     */
    public function setContent($content);

    /**
     * Get the content.
     *
     * @return string Content
     */
    public function getContent();
}
