<?php

namespace PHPDish\Bundle\ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PHPDishChatBundle:Default:index.html.twig');
    }
}
