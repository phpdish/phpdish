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

use PHPDish\Component\Media\Model\MediaInterface;

interface FileDownloaderInterface
{
    /**
     * 下载远程资源.
     *
     * @param string $mediaUrl
     *
     * @return MediaInterface
     *
     * @throws \RuntimeException
     */
    public function download($mediaUrl);
}
