<?php

namespace PHPDish\Component\Core\AvatarGenerator;

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
        $file = new File($this->namer->transformWithExtension('png'), file_get_contents($tmpFile));
        $this->fileManager->upload($file);
        @unlink($tmpFile);
        return $file;
    }
}