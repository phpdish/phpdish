<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RegistrationController extends Controller
{
    /**
     * @Route("/register", name="register")
     * @param Request $request
     * @return Response
     */
    public function registerAction(Request $request)
    {
        return $this->render('PHPDishWebBundle:Registration:register.html.twig');
    }
}