<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Controller;

use PHPDish\Bundle\AdminBundle\DataGrid\GridFactory;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdminController extends Controller
{
    /**
     * @var GridFactory
     */
    protected $gridFactory;

    public function __construct(GridFactory $gridFactory)
    {
        $this->gridFactory = $gridFactory;
    }
}
