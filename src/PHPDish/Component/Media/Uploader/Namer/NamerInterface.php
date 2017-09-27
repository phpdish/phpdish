<?php

namespace PHPDish\Component\Media\Uploader\Namer;

interface NamerInterface
{
    /**
     * 为文件对象生成存储键值
     * @param \SplFileInfo $file
     * @return string
     */
    public function transform(\SplFileInfo $file);
}