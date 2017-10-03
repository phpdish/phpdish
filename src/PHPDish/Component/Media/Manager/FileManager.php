<?php

namespace PHPDish\Component\Media\Manager;

use Gaufrette\Filesystem;
use PHPDish\Component\Media\Model\FileInterface;

class FileManager implements FileManagerInterface
{
    /**
     * @var Filesystem
     */
    protected $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    /**
     * {@inheritdoc}
     */
    public function upload(FileInterface $file, $overwrite = true)
    {
        $this->filesystem->write($file->getKey(), $file->getContent(), $overwrite);
    }

    /**
     * {@inheritdoc}
     */
    public function download(FileInterface $file)
    {
        $content = $this->filesystem->read($file->getKey());
        $file->setContent($content);
    }
}