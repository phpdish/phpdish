<?php

namespace PHPDish\Bundle\AdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishAdminBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
