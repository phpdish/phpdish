<?php

namespace PHPDish\Component\Media\Model;

/**
 * Class Media.
 */
abstract class Media implements MediaInterface
{
    /**
     * @var string
     *
     * Name
     */
    protected $key;

    /**
     * @var string
     *
     * Name
     */
    protected $url;

    /**
     * @return string
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * @param string $key
     *
     * @return Media
     */
    public function setKey($key)
    {
        $this->key = $key;

        return $this;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     *
     * @return Media
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }
}
