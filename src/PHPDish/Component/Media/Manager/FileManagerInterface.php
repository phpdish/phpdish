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

interface FileManagerInterface
{
    /**
     * 上传文件.
     *
     * @param FileInterface $file
     * @param bool          $overwrite
     */
    public function upload(FileInterface $file, $overwrite = true);

    /**
     * 下载文件内容.
     *
     * @param FileInterface $file
     * @param bool $streaming 读入流
     */
    public function download(FileInterface $file, $streaming = true);

    /**
     * 是否存在文件.
     *
     * @param FileInterface|string $file
     *
     * @return bool
     */
    public function has($file);
}
