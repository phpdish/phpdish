<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Security;

use PHPDish\Bundle\ResourceBundle\Security\EntityVoter;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;

class ThreadVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return ThreadInterface::class;
    }
}
