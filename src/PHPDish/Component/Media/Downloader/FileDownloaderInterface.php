<?php

namespace PHPDish\Component\Media\Downloader;

use PHPDish\Component\Media\Model\MediaInterface;

interface FileDownloaderInterface
{
    /**
     * 下载远程资源.
     *
     * @param $mediaUrl
     *
     * @return MediaInterface
     *
     * @throws \RuntimeException
     */
    public function download($mediaUrl);
}
