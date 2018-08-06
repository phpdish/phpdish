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

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader implements FileUploaderInterface
{
    /**
     * @var FileFactoryInterface
     */
    protected $fileFactory;

    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    public function __construct(FileFactoryInterface $fileFactory, FileManagerInterface $fileManager)
    {
        $this->fileFactory = $fileFactory;
        $this->fileManager = $fileManager;
    }

    /**
     * {@inheritdoc}
     */
    public function upload(UploadedFile $uploadedFile)
    {
        $file = $this->fileFactory->createFileFromUploadedFile($uploadedFile);
        $this->fileManager->upload($file, true);

        return $file;
    }
}
