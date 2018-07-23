<?php

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
