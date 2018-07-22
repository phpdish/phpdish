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