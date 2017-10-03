<?php

namespace PHPDish\Component\Media\Manager;

use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Model\Image;
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
        $isImage = $this->isImage($uploadedFile);
        $file = $isImage ? new Image() : new File();
        $file->setExtension($uploadedFile->guessExtension())
            ->setSize($uploadedFile->getSize())
            ->setContentType($uploadedFile->getMimeType())
            ->setContent(file_get_contents($uploadedFile->getRealPath()))
            ->setKey($this->namer->transform($uploadedFile))
            ->setUrl($this->urlBuilder->build($file));

        return $file;
    }

    /**
     * 判断上传的文件是否是图片
     * @param UploadedFile $uploadedFile
     * @return bool
     */
    public function isImage(UploadedFile $uploadedFile)
    {
        $contentType = $uploadedFile->getMimeType();
        return strpos($contentType, 'image') !== false;
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