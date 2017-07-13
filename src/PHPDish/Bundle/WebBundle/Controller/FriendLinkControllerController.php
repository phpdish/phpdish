<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class FriendLinkControllerController extends Controller
{
    public function indexAction($limit)
    {
        $links = $this->getDoctrine()->getEntityManager()
            ->getRepository('FriendLink');

    }
}
