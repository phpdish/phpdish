<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\EventListener;

use PHPDish\Bundle\CoreBundle\Util\NotificationHelper;
use PHPDish\Bundle\PaymentBundle\Event\PaymentEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PaymentSubscriber implements EventSubscriberInterface
{
    /**
     * @var NotificationHelper
     */
    protected $notificationHelper;

    public function __construct(NotificationHelper $notificationHelper)
    {
        $this->notificationHelper = $notificationHelper;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            PaymentEvent::WITHDRAW_APPROVED=> 'onWithdrawHandled',
            PaymentEvent::WITHDRAW_DECLINED=> 'onWithdrawHandled',
        ];
    }

    /**
     * 提现被处理
     * @param PaymentEvent $event
     */
    public function onWithdrawHandled(PaymentEvent $event)
    {
        $this->notificationHelper->createWithdrawNotification($event->getPayment());
    }
}