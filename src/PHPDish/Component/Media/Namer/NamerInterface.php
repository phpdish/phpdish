<?php

namespace PHPDish\Component\Media\Namer;

interface NamerInterface
{
    /**
     * 为文件对象生成存储键值
     *
     * @param \SplFileInfo $file
     *
     * @return string
     */
    public function transform(\SplFileInfo $file);

    /**
     * 从资源的url生成存储键.
     *
     * @param string $url
     *
     * @return string
     */
    public function transformFromUrl($url);

    /**
     * 根据扩展名生成.
     *
     * @param string $extension
     *
     * @return string
     */
    public function transformWithExtension($extension);
}
