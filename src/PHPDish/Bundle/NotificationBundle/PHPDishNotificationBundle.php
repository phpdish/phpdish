<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle;

use PHPDish\Bundle\NotificationBundle\DependencyInjection\PHPDishNotificationExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishNotificationBundle extends AbstractBundle
{
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishNotificationExtension();
        }
        return $this->extension;
    }
}
