<?php

namespace PHPDish\Component\Media\Uploader;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageUploader extends FileUploader
{
    public function upload(UploadedFile $file)
    {
        return parent::upload($file);
    }
}
