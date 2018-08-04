<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\EventListener;

use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserEvent;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

final class UserListener
{
    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    public function __construct(
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * @param UserInterface $user
     * @param LifecycleEventArgs $event
     */
    public function postPersist($user, LifecycleEventArgs $event)
    {
        $this->eventDispatcher->dispatch(Events::USER_CREATED, new UserEvent($user));
    }
}