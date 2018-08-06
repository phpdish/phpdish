<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
