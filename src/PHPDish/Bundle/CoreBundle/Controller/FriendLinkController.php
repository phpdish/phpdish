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
        if (true|| !$cacheItem->isHit()) {
            $friendLinks = $this->get('phpdish.manager.friend_link')->findAllEnabledFriendLinks();
            $cacheItem->set($friendLinks)->expiresAt(Carbon::now()->addDay(2));
            $cachePool->save($cacheItem);
        }
        return $this->render('PHPDishWebBundle:Common:_friend_link_list.html.twig', [
            'friendLinks' => $cacheItem->get(),
        ]);
    }
}
