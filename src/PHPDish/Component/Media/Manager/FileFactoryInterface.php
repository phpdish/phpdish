<?php

namespace PHPDish\Component\Media\Manager;

use PHPDish\Component\Media\Model\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileFactoryInterface
{
    /**
     * 从上传的文件生成
     * @param UploadedFile $uploadedFile
     * @return File
     */
    public function createFileFromUploadedFile(UploadedFile $uploadedFile);

    /**
     * 生成文件
     * @param string $key
     * @return File
     */
    public function createFileByKey($key);
}