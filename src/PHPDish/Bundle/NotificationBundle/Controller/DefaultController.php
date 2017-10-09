<?php

namespace PHPDish\Bundle\NotificationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PHPDishNotificationBundle:Default:index.html.twig');
    }
}
