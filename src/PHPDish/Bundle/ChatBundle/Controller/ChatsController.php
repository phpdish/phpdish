<?php

namespace PHPDish\Bundle\ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ChatsController extends Controller
{
    /**
     * @Route("/chats", name="chats")
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {


        return $this->render('PHPDishChatBundle:Default:index.html.twig');
    }
}
