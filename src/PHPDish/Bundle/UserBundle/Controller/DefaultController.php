<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PHPDishUserBundle:Default:index.html.twig');
    }
}
