<?php

namespace PHPDish\Component\Media\Manager;

use PHPDish\Component\Media\Model\FileInterface;

interface FileManagerInterface
{
    /**
     * 上传文件.
     *
     * @param FileInterface $file
     * @param bool          $overwrite
     */
    public function upload(FileInterface $file, $overwrite = true);

    /**
     * 下载文件内容.
     *
     * @param FileInterface $file
     */
    public function download(FileInterface $file);

    /**
     * 是否存在文件.
     *
     * @param FileInterface|string $file
     *
     * @return bool
     */
    public function has($file);
}
