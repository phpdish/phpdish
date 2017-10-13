<?php

namespace PHPDish\Bundle\NotificationBundle\Twig;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class NotificationExtension extends \Twig_Extension
{
    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    public function __construct(NotificationManagerInterface $notificationManager, TokenStorageInterface $tokenStorage)
    {
        $this->notificationManager = $notificationManager;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('notification_unseen_number', [$this, 'getUnSeenNotificationNumber']),
        );
    }

    /**
     * 获取当前用户未读的消息数量.
     *
     * @param UserInterface $user
     *
     * @return int
     */
    public function getUnSeenNotificationNumber(UserInterface $user = null)
    {
        return $this->notificationManager->getUserUnSeenNotificationCount($user ?: $this->getUser());
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'phpdish_notification';
    }

    /**
     * 获取当前登录用户.
     *
     * @return UserInterface
     */
    protected function getUser()
    {
        $user = $this->tokenStorage->getToken() ? $this->tokenStorage->getToken()->getUser() : false;
        if (!$user instanceof UserInterface) {
            throw new \RuntimeException('There is no authenticated user');
        }

        return $user;
    }
}
