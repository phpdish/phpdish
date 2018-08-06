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

use Gaufrette\Adapter\StreamFactory;
use Gaufrette\Filesystem;
use Gaufrette\StreamMode;
use PHPDish\Component\Media\Model\FileInterface;
use Psr\Http\Message\StreamInterface;

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
        $body = $file->getContent();
        if ($body instanceof StreamInterface) { //流式写入
            $this->assertStreamingSupport(); //不支持流式读写抛出异常
            $stream = $this->filesystem->createStream($file->getKey());
            $stream->open(new StreamMode('w+'));
            while (!$body->eof()) {
                $stream->write($body->read(1024));
            }
            $stream->close(); //close the stream
        } else {
            $this->filesystem->write($file->getKey(), $body, $overwrite);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function download(FileInterface $file, $streaming = true)
    {
        if ($streaming) {
            $this->assertStreamingSupport(); //不支持流式读写抛出异常
            $body = $this->filesystem->createStream($file->getKey());
        } else {
            $body = $this->filesystem->read($file->getKey());
        }
        $file->setContent($body);
    }

    /**
     * {@inheritdoc}
     */
    public function has($file)
    {
        $key = $file instanceof FileInterface ? $file->getKey() : $file;

        return $this->filesystem->has($key);
    }

    protected function assertStreamingSupport()
    {
        if (!$this->filesystem->getAdapter() instanceof StreamFactory) {
            throw new \InvalidArgumentException('The streaming io is not support for the adapter');
        }
    }
}
