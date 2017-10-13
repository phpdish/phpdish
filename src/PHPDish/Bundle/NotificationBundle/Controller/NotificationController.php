<?php

namespace PHPDish\Bundle\NotificationBundle\Controller;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends Controller
{
    /**
     * 当前用户的通知数量.
     *
     * @Route("/notifications/count", name="notification_count")
     */
    public function count()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
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
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getNotificationManager();
        $notifications = $manager->findUserNotifications(
            $this->getUser(),
            $request->query->getInt('page', 1)
        );
        $manager->readNotifications($notifications->getCurrentPageResults());

        return $this->render('PHPDishWebBundle:Notification:index.html.twig', [
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
