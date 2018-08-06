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

use PHPDish\Component\Media\Model\FileInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileUploaderInterface
{
    /**
     * 上传文件.
     *
     * @param UploadedFile $file
     *
     * @return FileInterface
     */
    public function upload(UploadedFile $file);
}
