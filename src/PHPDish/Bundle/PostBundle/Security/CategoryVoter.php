<?php

namespace PHPDish\Bundle\PostBundle\Security;

use PHPDish\Bundle\CoreBundle\Security\EntityVoter;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;

class CategoryVoter extends EntityVoter
{
    protected function getResourceClass()
    {
        return CategoryInterface::class;
    }
}
