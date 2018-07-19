<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Component\Content\Model;

trait ContentTrait
{
    /**
     * @var string
     */
    protected $body;

    /**
     * @var string
     */
    protected $originalBody;

    /**
     * Set body.
     *
     * @param string $body
     *
     * @return $this
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get body.
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set originalBody.
     *
     * @param string $originalBody
     *
     * @return $this
     */
    public function setOriginalBody($originalBody)
    {
        $this->originalBody = $originalBody;

        return $this;
    }

    /**
     * Get originalBody.
     *
     * @return string
     */
    public function getOriginalBody()
    {
        return $this->originalBody;
    }
}
