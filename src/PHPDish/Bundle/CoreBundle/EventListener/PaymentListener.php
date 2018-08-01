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