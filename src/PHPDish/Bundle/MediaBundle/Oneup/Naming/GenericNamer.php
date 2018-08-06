<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\MediaBundle\Oneup\Naming;

use Oneup\UploaderBundle\Uploader\File\FileInterface;
use Oneup\UploaderBundle\Uploader\Naming\NamerInterface;
use PHPDish\Component\Media\Namer\DatePathNamer;

class GenericNamer extends DatePathNamer implements NamerInterface
{
    /**
     * {@inheritdoc}
     */
    public function name(FileInterface $file)
    {
        return $this->transform($file);
    }
}