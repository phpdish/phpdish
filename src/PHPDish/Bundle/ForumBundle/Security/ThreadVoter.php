<?php

namespace PHPDish\Bundle\ForumBundle\Security;

use PHPDish\Bundle\CoreBundle\Security\EntityVoter;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;

class ThreadVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return ThreadInterface::class;
    }
}
