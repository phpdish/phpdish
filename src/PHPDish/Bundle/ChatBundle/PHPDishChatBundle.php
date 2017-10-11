<?php

namespace PHPDish\Bundle\ChatBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishChatBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSMessageBundle';
    }
}
