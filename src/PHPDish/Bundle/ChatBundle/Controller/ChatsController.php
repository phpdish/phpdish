<?php

namespace PHPDish\Bundle\ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ChatsController extends Controller
{
    /**
     *
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {


        return $this->render('PHPDishChatBundle:Default:index.html.twig');
    }
}
