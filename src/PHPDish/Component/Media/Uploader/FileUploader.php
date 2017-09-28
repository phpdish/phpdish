<?php

namespace PHPDish\Component\Media\Uploader;

use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Namer\NamerInterface;
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
    public function upload(UploadedFile $uploadedFile)
    {
        $file = static::createFile($uploadedFile)
            ->setKey($this->namer->transform($uploadedFile));
        $this->fileManager->upload($file, true);
        return $file;
    }

    protected static function createFile(UploadedFile $uploadedFile)
    {
        $file = new File();
        $file->setExtension($uploadedFile->guessExtension())
            ->setSize($uploadedFile->getSize())
            ->setContentType($uploadedFile->getMimeType())
            ->setContent(file_get_contents($uploadedFile->getRealPath()));
        return $file;
    }
}