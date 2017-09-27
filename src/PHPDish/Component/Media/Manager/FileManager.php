<?php

namespace PHPDish\Component\Media\Manager;

use Gaufrette\Filesystem;

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
    public function upload($path, $data, $overwrite = true)
    {
        $this->filesystem->write($path, $data, $overwrite);
    }

    /**
     * {@inheritdoc}
     */
    public function get($key)
    {
        return $this->filesystem->get($key);
    }

    /**
     * {@inheritdoc}
     */
    public function has($key)
    {
        return $this->filesystem->has($key);
    }
}