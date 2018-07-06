<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\Common\Persistence\Event\PreUpdateEventArgs;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Service\UserManager;

class PointHistorySubscriber implements EventSubscriber
{
    /**
     * @var UserManager
     */
    protected $userManager;

    public function __construct(UserManager $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return ['postPersist', 'postUpdate', 'preRemove'];
    }

    public function postPersist(LifecycleEventArgs $event)
    {
        $history = $event->getObject();

        if (!$history instanceof PointHistoryInterface) {
            return;
        }

        $user = $history->getUser();

        if ($history->isIncome()) {
            $point = $history->getAmount();
        } else {
            $point = -$history->getAmount();
        }
        $user->increasePoint($point);
        $this->userManager->saveUser($user);
    }

    public function postUpdate(PreUpdateEventArgs $event)
    {
        $history = $event->getObject();

        if (!$history instanceof PointHistoryInterface || !$event->hasChangedField('amount')) {
            return;
        }
        $addedPoints = $event->getNewValue('amount') - $event->getOldValue('amount');
        if (!$history->isIncome()) {
            $addedPoints = - $addedPoints;
        }
        $user = $history->getUser();
        $user->increasePoint($addedPoints);
        $this->userManager->saveUser($user);
    }

    public function preRemove(LifecycleEventArgs $event)
    {
        $history = $event->getObject();

        if (!$history instanceof PointHistoryInterface) {
            return;
        }
        $user = $history->getUser();
        if ($history->isIncome()) {
            $point = -$history->getAmount();
        } else {
            $point = $history->getAmount();
        }
        $user->increasePoint($point);
        $this->userManager->saveUser($user);
    }
}