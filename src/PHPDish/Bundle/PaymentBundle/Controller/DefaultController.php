<?php

namespace PHPDish\Bundle\PaymentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PHPDishPaymentBundle:Default:index.html.twig');
    }
}
