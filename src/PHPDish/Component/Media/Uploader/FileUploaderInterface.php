<?php

namespace PHPDish\Component\Media\Uploader;

use Gaufrette\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileUploaderInterface
{
    /**
     * 上传文件
     * @param UploadedFile $file
     * @return File
     */
    public function upload(UploadedFile $file);
}