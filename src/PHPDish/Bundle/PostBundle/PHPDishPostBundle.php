<?php

namespace PHPDish\Bundle\PostBundle;

use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishPostBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    protected function getModelNamespace()
    {
        return 'PHPDish\Bundle\PostBundle\Model';
    }
}
