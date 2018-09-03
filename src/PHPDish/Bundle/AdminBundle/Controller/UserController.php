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

use PHPDish\Bundle\CoreBundle\Model\User;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AdminController
{
    /**
     * 用户管理列表
     *
     * @Route("/users", name="admin_user_index")
     */
    public function indexAction()
    {
        $this->breadcrumb->push('admin.user.index');
        $grid = $this->gridFactory->get(User::class);
        return $this->render('PHPDishAdminBundle:User:index.html.twig', [
            'grid' => $grid
        ]);
    }

    /**
     * 用户详情
     *
     * @Route("/users/show", name="admin_user_show")
     */
    public function showAction()
    {
    }
}
