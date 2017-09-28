<?php

namespace PHPDish\Component\Media\Uploader;

use PHPDish\Component\Media\Model\FileInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileUploaderInterface
{
    /**
     * 上传文件
     * @param UploadedFile $file
     * @return FileInterface
     */
    public function upload(UploadedFile $file);
}