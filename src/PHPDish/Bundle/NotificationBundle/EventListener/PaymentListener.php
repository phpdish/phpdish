<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\PaymentBundle\Event\PaymentEvent;

class PaymentListener extends EventListener
{
    /**
     * 提现被处理
     * @param PaymentEvent $event
     */
    public function onWithdrawHandled(PaymentEvent $event)
    {
        $this->notificationManager->createWithdrawNotification($event->getPayment());
    }
}