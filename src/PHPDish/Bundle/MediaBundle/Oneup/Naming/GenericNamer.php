<?php

namespace PHPDish\Bundle\MediaBundle\Oneup\Naming;

use Oneup\UploaderBundle\Uploader\File\FileInterface;
use Oneup\UploaderBundle\Uploader\Naming\NamerInterface;

class GenericNamer extends \PHPDish\Component\Media\Namer\DatePathNamer implements NamerInterface
{
    /**
     * {@inheritdoc}
     */
    public function name(FileInterface $file)
    {
        return $this->transform($file);
    }
}