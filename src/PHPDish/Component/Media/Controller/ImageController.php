<?php

namespace PHPDish\Component\Media\Controller;

use PHPDish\Component\Media\Manager\FileFactoryInterface;
use PHPDish\Component\Media\Manager\FileManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ImageController
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

    public function resizeAction($key, Request $request)
    {
        $width = $request->query->get('width');
        $height = $request->query->get('height');
        $file = $this->fileFactory->createFileByKey($key);

    }
}