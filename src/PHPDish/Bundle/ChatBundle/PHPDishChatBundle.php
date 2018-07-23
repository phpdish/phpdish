<?php

namespace PHPDish\Bundle\ChatBundle;

use PHPDish\Bundle\ChatBundle\DependencyInjection\PHPDishChatExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishChatBundle extends AbstractBundle
{
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishChatExtension();
        }
        return $this->extension;
    }
}