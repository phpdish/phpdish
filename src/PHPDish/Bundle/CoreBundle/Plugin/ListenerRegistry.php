<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Plugin;

use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;

class ListenerRegistry extends ArrayCollection
{
    /**
     * 添加事件监听
     *
     * @param string $eventName
     * @param string|array $listener
     * @param int $priority
     * @return ListenerRegistry
     */
    public function addListener($eventName, $listener, $priority = 0)
    {
        $this->add([$eventName, $listener, $priority]);
        return $this;
    }

    /**
     * 添加事件订阅
     *
     * @param string $subscriber
     * @return ListenerRegistry
     */
    public function addSubscriber($subscriber)
    {
        $this->add($subscriber);
        return $this;
    }
}