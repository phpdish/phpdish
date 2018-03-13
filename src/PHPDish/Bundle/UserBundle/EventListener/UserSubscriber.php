<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use FOS\UserBundle\Event\GetResponseNullableUserEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserSubscriber implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            ''
        ];
    }

    /**
     * 发送重置密码邮件初始化之前
     * @param GetResponseNullableUserEvent $event
     */
    public function onResettingSendEmailInitialize(GetResponseNullableUserEvent $event)
    {
        $request = $event->getRequest();
        if ($request) {

        }
    }
}