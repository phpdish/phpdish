<?php

namespace PHPDish\Component\Media\Downloader;

use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Namer\NamerInterface;

class FileDownloader implements FileDownloaderInterface
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
    public function download($mediaUrl)
    {
        $content = @file_get_contents($mediaUrl);
        if ($content === false) {
            throw new \RuntimeException(sprintf('Fail to donwload the resource "%s"', $mediaUrl));
        }
        $file = new File();
        $file->setContent($content)
            ->setKey($this->namer->transformFromUrl($mediaUrl));
        $this->fileManager->upload($file);

        return $file;
    }
}
