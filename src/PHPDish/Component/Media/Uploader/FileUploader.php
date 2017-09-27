<?php

namespace PHPDish\Component\Media\Uploader;

use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Uploader\Namer\NamerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader implements FileUploaderInterface
{
    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    /**
     * @var NamerInterface
     */
    protected $namer;

    public function __construct(FileManagerInterface $fileManager, NamerInterface $namer)
    {
        $this->fileManager = $fileManager;
        $this->namer = $namer;
    }

    /**
     * {@inheritdoc}
     */
    public function upload(UploadedFile $file)
    {
        $key = $this->namer->transform($file);
        $this->fileManager->upload(
            $key,
            file_get_contents($file->getRealPath())
        );
        return $this->fileManager->get($key);
    }
}