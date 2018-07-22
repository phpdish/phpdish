<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Enqueue\Client\Message;
use Enqueue\Client\Producer;
use PHPDish\Bundle\UserBundle\Model\User;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserEvent;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

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