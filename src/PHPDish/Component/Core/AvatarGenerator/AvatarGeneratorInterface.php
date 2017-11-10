<?php

namespace PHPDish\Component\Core\AvatarGenerator;

use PHPDish\Component\Media\Model\FileInterface;

interface AvatarGeneratorInterface
{
    /**
     * 生成头像
     * @param string $idString
     * @param int $width
     * @return FileInterface
     */
    public function generate($idString, $width = 256);
}