<?php

namespace PHPDish\Component\Media\Model;

interface MediaInterface
{
    /**
     * 获取媒体文件的key.
     *
     * @return string
     */
    public function getKey();

    /**
     * 获取web访问的链接.
     *
     * @return string
     */
    public function getUrl();
}
