<?php

namespace PHPDish\Bundle\MediaBundle;

use PHPDish\Bundle\MediaBundle\DependencyInjection\PHPDishMediaExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishMediaBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishMediaExtension();
        }
        return $this->extension;
    }
}
