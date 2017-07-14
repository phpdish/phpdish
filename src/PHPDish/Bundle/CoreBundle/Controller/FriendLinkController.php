<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class FriendLinkController extends Controller
{
    public function listAction($limit = 10)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $friendLinks  = $em->getRepository('PHPDishCoreBundle:FriendLink')->findList($limit);
        return $this->render('PHPDishWebBundle:FriendLink:list.html.twig', [
            'friendLinks' => $friendLinks
        ]);
    }
}