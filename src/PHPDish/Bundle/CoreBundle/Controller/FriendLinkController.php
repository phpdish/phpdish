<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FriendLinkController extends Controller
{
    public function listAction($limit = 10)
    {
        $cachePool = $this->get('cache.app');
        $cacheItem = $cachePool->getItem("hot_threads_{$limit}");
        if (!$cacheItem->isHit()) {
            $em = $this->getDoctrine()->getManager();
            $friendLinks = $em->getRepository('PHPDishCoreBundle:FriendLink')->findBy([], [], $limit);
            $cacheItem->set($friendLinks);
        }

        return $this->render('PHPDishWebBundle:FriendLink:list.html.twig', [
            'friendLinks' => $cacheItem->get(),
        ]);
    }
}
