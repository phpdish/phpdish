<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FriendLinkController extends Controller
{
    public function listAction($limit = 10)
    {
        $cachePool = $this->get('cache.app');
        $cacheItem = $cachePool->getItem("friends_link_{$limit}");
        if (!$cacheItem->isHit()) {
            $em = $this->getDoctrine()->getManager();
            $friendLinks = $em->getRepository('PHPDishCoreBundle:FriendLink')->findBy([], [], $limit);
            $cacheItem->set($friendLinks)->expiresAt(Carbon::now()->addDay(2));
            $cachePool->save($cacheItem);
        }
        return $this->render('PHPDishWebBundle:FriendLink:list.html.twig', [
            'friendLinks' => $cacheItem->get(),
        ]);
    }
}
