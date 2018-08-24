<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\AvatarGenerator;

use GuzzleHttp\Psr7\Stream;
use Md\MDAvatars;
use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Namer\NamerInterface;

class AvatarGenerator implements AvatarGeneratorInterface
{
    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    /**
     * @var NamerInterface
     */
    protected $namer;

    public function __construct(FileManagerInterface $fileManager, NamerInterface $namer)
    {
        $this->fileManager = $fileManager;
        $this->namer = $namer;
    }

    /**
     * {@inheritdoc}
     */
    public function generate($idString, $width = 256)
    {
        $avatar = new MDAvatars($idString, $width);
        $tmpFile = sys_get_temp_dir() . '/' . md5(uniqid('avatar'));
        $avatar->Save($tmpFile, $width);
        $content = new Stream(fopen($tmpFile, 'r+'));
        $file = new File($this->namer->transformWithExtension('png'), $content);
        $this->fileManager->upload($file);
        @unlink($tmpFile);
        return $file;
    }
}