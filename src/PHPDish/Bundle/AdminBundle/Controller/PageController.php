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

use Symfony\Component\Routing\Annotation\Route;

class PageController extends AdminController
{
    /**
     * @Route("/", name="admin_homepage")
     */
    public function index()
    {
        return $this->render('PHPDishAdminBundle:Page:index.html.twig');
    }
}
