<?php

namespace PHPDish\Bundle\PostBundle\Security;

use PHPDish\Bundle\CoreBundle\Security\EntityVoter;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;

class CommentVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return CommentInterface::class;
    }
}
