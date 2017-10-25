<?php

namespace PHPDish\Bundle\ForumBundle\Security;

use PHPDish\Bundle\CoreBundle\Security\EntityVoter;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;

class TopicVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return TopicInterface::class;
    }
}
