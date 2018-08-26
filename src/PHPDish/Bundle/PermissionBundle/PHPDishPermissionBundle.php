<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PermissionBundle;

use PHPDish\Bundle\PermissionBundle\DependencyInjection\PHPDishPermissionExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishPermissionBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishPermissionExtension();
        }
        return $this->extension;
    }
}