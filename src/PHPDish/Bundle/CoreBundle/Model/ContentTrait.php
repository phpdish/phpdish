<?php

namespace PHPDish\Bundle\CoreBundle\Model;

trait ContentTrait
{
    protected $body;

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
