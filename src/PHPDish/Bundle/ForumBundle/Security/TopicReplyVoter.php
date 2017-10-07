<?php

namespace PHPDish\Bundle\ForumBundle\Security;

use PHPDish\Bundle\CoreBundle\Security\EntityVoter;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;

class TopicReplyVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return ReplyInterface::class;
    }
}