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

use PHPDish\Bundle\AdminBundle\DataGrid\GridSourceFactory;
use PHPDish\Bundle\CoreBundle\Model\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AdminController
{
    /**
     * @Route("/users", name="admin_user_index")
     */
    public function index()
    {
        $grid = $this->sourceFactory->grid(User::class);
        return $this->render('PHPDishAdminBundle:User:index.html.twig', [
            'grid' => $grid
        ]);
    }
}
