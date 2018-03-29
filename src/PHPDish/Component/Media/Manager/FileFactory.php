<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Component\Media\Manager;

use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Model\Image;
use PHPDish\Component\Media\Namer\NamerInterface;
use PHPDish\Component\Media\UrlBuilder\UrlBuilderInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileFactory implements FileFactoryInterface
{
    /**
     * @var NamerInterface
     */
    protected $namer;

    public function __construct(NamerInterface $namer)
    {
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
            ->setKey($this->namer->transform($uploadedFile));

        return $file;
    }

    /**
     * 判断上传的文件是否是图片.
     *
     * @param UploadedFile $uploadedFile
     *
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
        return $file;
    }
}
