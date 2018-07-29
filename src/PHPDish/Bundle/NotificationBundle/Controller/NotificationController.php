<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Controller;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends ResourceController
{
    /**
     * 当前用户的通知数量.
     *
     * @Route("/notifications/count", name="notification_count")
     */
    public function count()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $count = $this->get('phpdish.manager.notification')->getUserUnSeenNotificationCount($this->getUser());
        $nbMessageCount = $this->get('fos_message.provider')->getNbUnreadMessages();

        return $this->json([
            'count' => $count + $nbMessageCount,
        ]);
    }

    /**
     * 当前用户的通知.
     *
     * @Route("/notifications", name="notifications")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getNotificationManager();
        $notifications = $manager->findUserNotifications(
            $this->getUser(),
            $request->query->getInt('page', 1)
        );
        $manager->readNotifications($notifications->getCurrentPageResults());

        return $this->render($this->configuration->getTemplate('Notification:index.html.twig'), [
            'notifications' => $notifications,
        ]);
    }

    /**
     * @return NotificationManagerInterface
     */
    protected function getNotificationManager()
    {
        return $this->get('phpdish.manager.notification');
    }
}
