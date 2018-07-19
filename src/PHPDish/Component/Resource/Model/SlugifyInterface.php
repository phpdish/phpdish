<?php

namespace PHPDish\Component\Resource\Model;

interface SlugifyInterface
{
    /**
     * 获取slug.
     *
     * @return string
     */
    public function getSlug();

    /**
     * 设置slug
     *
     * @param string $slug
     * @return self
     */
    public function setSlug($slug);
}
