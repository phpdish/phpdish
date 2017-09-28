<?php

namespace PHPDish\Component\Media\Manager;

use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Namer\NamerInterface;
use PHPDish\Component\Media\UrlBuilder\UrlBuilderInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileFactory  implements FileFactoryInterface
{
    /**
     * @var UrlBuilderInterface
     */
    protected $urlBuilder;

    /**
     * @var NamerInterface
     */
    protected $namer;

    public function __construct(UrlBuilderInterface $urlBuilder, NamerInterface $namer)
    {
        $this->urlBuilder = $urlBuilder;
        $this->namer = $namer;
    }

    /**
     * {@inheritdoc}
     */
    public function createFileFromUploadedFile(UploadedFile $uploadedFile)
    {
        $file = new File();
        $file->setExtension($uploadedFile->guessExtension())
            ->setSize($uploadedFile->getSize())
            ->setContentType($uploadedFile->getMimeType())
            ->setContent(file_get_contents($uploadedFile->getRealPath()))
            ->setKey($this->namer->transform($uploadedFile));
        return $file;
    }

    /**
     * {@inheritdoc}
     */
    public function createFileByKey($key)
    {
        $file = new File($key);
        $file->setUrl($this->urlBuilder->build($file));
        return $file;
    }
}