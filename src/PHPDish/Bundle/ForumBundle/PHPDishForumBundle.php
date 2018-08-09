<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle;

use PHPDish\Bundle\ForumBundle\DependencyInjection\PHPDishForumExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishForumBundle extends AbstractBundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishForumExtension();
        }
        return $this->extension;
    }
}
