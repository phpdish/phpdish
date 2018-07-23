<?php

namespace PHPDish\Bundle\PostBundle;

use PHPDish\Bundle\PostBundle\DependencyInjection\PHPDishPostExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishPostBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishPostExtension();
        }
        return $this->extension;
    }
}
