<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Bundle\WebBundle\Controller;

use Carbon\Carbon;
use PHPDish\Bundle\PostBundle\Controller\ManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    use ManagerTrait;

    use \PHPDish\Bundle\ForumBundle\Controller\ManagerTrait;

    /**
     * 首页（暂时不启用）.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $postManager = $this->getPostManager();
        $posts = $postManager->findLatestPosts($request->query->getInt('page', 1));
        $topics = $this->getTopicManager()->findHotTopics(Carbon::now()->addDays(-10), 15);

        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'posts' => $posts,
            'topics' => $topics,
        ]);
    }

    /**
     * 当前用户的通知数量.
     *
     * @Route("/notifications/count", name="notification_count")
     */
    public function countNotificationAction()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $count = $this->get('phpdish.manager.notification')->getNotificationCount($this->getUser(), false);
        $nbMessageCount = $this->get('fos_message.provider')->getNbUnreadMessages();
        return $this->json([
            'count' => $count + $nbMessageCount,
        ]);
    }
}
