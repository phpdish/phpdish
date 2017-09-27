<?php

namespace PHPDish\Component\Media\Manager;

use Gaufrette\File;

interface FileManagerInterface
{
    /**
     * 向指定位置写入文件
     * @param string $key
     * @param string $data
     * @param bool $overwrite
     * @return boolean
     */
    public function upload($key, $data, $overwrite = true);

    /**
     * 检查文件是否存在
     * @param string $key
     * @return boolean
     */
    public function has($key);

    /**
     * 获取文件
     * @param string $key
     * @return File
     */
    public function get($key);
}