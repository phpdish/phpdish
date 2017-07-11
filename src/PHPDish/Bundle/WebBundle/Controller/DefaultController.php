<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PHPDishWebBundle:Default:index.html.twig');
    }
}
