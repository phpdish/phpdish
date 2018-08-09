<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ChatBundle;

use PHPDish\Bundle\ChatBundle\DependencyInjection\PHPDishChatExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishChatBundle extends AbstractBundle
{
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishChatExtension();
        }
        return $this->extension;
    }
}