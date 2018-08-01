<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Twig;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class NotificationExtension extends \Twig_Extension
{
    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    public function __construct(NotificationManagerInterface $notificationManager)
    {
        $this->notificationManager = $notificationManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('notification_unseen_count', [$this, 'getUnseenNotificationCount']),
            new \Twig_SimpleFunction('notification_count', [$this, 'getNotificationCount']),
        );
    }

    /**
     * @param UserInterface $user
     * @return int
     */
    public function getUnseenNotificationCount(UserInterface $user)
    {
        return $this->notificationManager->getNotificationCount($user, false);
    }

    /**
     * @param UserInterface $user
     * @return int
     */
    public function getNotificationCount(UserInterface $user)
    {
        return $this->notificationManager->getNotificationCount($user,  null);
    }
}
