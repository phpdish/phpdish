<?php

namespace PHPDish\Component\Media\Namer;

use Carbon\Carbon;
use Gaufrette\Filesystem;

class GeneralNamer implements NamerInterface
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
    public function transform(\SplFileInfo $file)
    {
        $baseDir = Carbon::now()->format('Y/md');
        do {
            $path = "{$baseDir}/{$this->generateKey()}." . $file->guessExtension();
        } while ($this->filesystem->has($path));
        return $path;
    }

    protected function generateKey()
    {
        return md5(uniqid((string) mt_rand(), true));
    }
}