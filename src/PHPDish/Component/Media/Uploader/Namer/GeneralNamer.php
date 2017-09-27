<?php

namespace PHPDish\Component\Media\Uploader\Namer;


use Carbon\Carbon;
use PHPDish\Component\Media\Manager\FileManagerInterface;

class GeneralNamer implements NamerInterface
{
    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    public function transform(\SplFileInfo $file)
    {
        $baseDir = Carbon::now()->format('Y/md');
        do {
            $path = "{$baseDir}/{$this->generateKey()}." . $file->getExtension();
        } while ($this->fileManager->has($path));
        return $path;
    }

    protected function generateKey()
    {
        return md5(uniqid((string) mt_rand(), true));
    }
}