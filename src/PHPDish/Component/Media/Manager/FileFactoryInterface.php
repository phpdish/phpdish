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

interface FileFactoryInterface
{
    /**
     * 从上传的文件生成.
     *
     * @param UploadedFile $uploadedFile
     *
     * @return FileInterface
     */
    public function createFileFromUploadedFile(UploadedFile $uploadedFile);

    /**
     * 生成文件.
     *
     * @param string $key
     *
     * @return FileInterface
     */
    public function createFileByKey($key);

    /**
     * 生成带有指定扩展名的文件
     *
     * @param string $extension
     * @return FileInterface
     */
    public function createFileWithExtension($extension);
}
