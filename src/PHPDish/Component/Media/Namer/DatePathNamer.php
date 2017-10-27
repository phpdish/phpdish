<?php

namespace PHPDish\Component\Media\Namer;

use Carbon\Carbon;
use Gaufrette\Filesystem;
use PHPDish\Component\Util\ExtensionFinder;

class DatePathNamer implements NamerInterface
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
        return $this->transformWithExtension($file->guessExtension());
    }

    /**
     * {@inheritdoc}
     */
    public function transformFromUrl($url)
    {
        $extension = ExtensionFinder::find($url);

        return $this->transformWithExtension(strrchr($url, $extension));
    }

    /**
     * {@inheritdoc}
     */
    public function transformWithExtension($extension)
    {
        $baseDir = Carbon::now()->format('Y/md');
        do {
            $path = "{$baseDir}/{$this->generateKey()}.".$extension;
        } while ($this->filesystem->has($path));

        return $path;
    }

    protected function generateKey()
    {
        return md5(uniqid((string) mt_rand(), true));
    }
}
