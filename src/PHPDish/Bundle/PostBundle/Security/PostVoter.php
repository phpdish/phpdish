<?php

namespace PHPDish\Bundle\PostBundle\Security;

use PHPDish\Bundle\ResourceBundle\Security\EntityVoter;
use PHPDish\Bundle\PostBundle\Model\Post;

class PostVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return Post::class;
    }
}
