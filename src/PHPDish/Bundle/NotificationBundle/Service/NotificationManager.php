<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Bundle\NotificationBundle\Service;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationMetadataInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class NotificationManager implements NotificationManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var string
     */
    protected $notificationEntity;

    /**
     * @var string
     */
    protected $metadataEntity;

    public function __construct(
        $notificationEntity,
        $metadataEntity,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->notificationEntity = $notificationEntity;
        $this->metadataEntity = $metadataEntity;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * {@inheritdoc}
     */
    public function createNotification($subject, $message = null)
    {
        $notification = new $this->notificationEntity();
        $notification->setSubject($subject);
        $message && $notification->setMessage($message);
        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function sendNotification($participants, NotificationInterface $notification, $send = false)
    {
        foreach ($participants as $participant) {
            $metadata = new $this->metadataEntity();
            $metadata->setParticipant($participant);
            $notification->addMetadata($metadata);
        }
        $this->entityManager->persist($notification);
        $send && $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function sendAll()
    {
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function findNotifications(UserInterface $participant, $seen = null)
    {
        $qb = $this->getNotificationQb($participant, $seen);
        return $qb->getQuery()->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findNotificationsPager(UserInterface $participant, $seen = null, $page, $limit = null)
    {
        $qb = $this->getNotificationQb($participant, $seen);
        return $this->createPaginator($qb->getQuery(), $page, $limit);
    }

    protected function getNotificationQb(UserInterface $participant, $seen = null)
    {
        $qb = $this->getRepository()->createQueryBuilder('n')
            ->innerJoin('n.metadata', 'nm')
            ->where('nm.participant = :participant')
            ->setParameter('participant', $participant);
        if ($seen !== null) {
            $qb->where('nm.seen =:seen')->setParameter('seen', (boolean)$seen);
        }
        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function findNotificationMetadata(UserInterface $participant, $seen = null)
    {
        return $this->getNotificationQb($participant, $seen)->getQuery()->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findNotificationMetadataPager(UserInterface $participant, $seen, $page, $limit = null)
    {
        $qb = $this->getNotificationQb($participant, $seen)->getQuery();
        return $this->createPaginator($qb, $page, $limit);
    }

    /**
     * 获取参与者metadata qb
     *
     * @param UserInterface $participant
     * @param boolean $seen
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function getParticipantMetadataQb(UserInterface $participant, $seen)
    {
        $qb = $this->getMetadataRepository()->createQueryBuilder('m')
            ->where('m.participant = :participant')
            ->setParameter('participant', $participant);
        if ($seen !== null) {
            $qb->where('m.seen =:seen')->setParameter('seen', (boolean)$seen);
        }
        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function markAllAsSeen(UserInterface $participant)
    {
        $notifications = $this->findNotificationMetadata($participant, false);
        foreach ($notifications as $notification) {
            $notification->setSeen(true);
        }
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function markAsSeen(UserInterface $participant, NotificationInterface $notification)
    {
        $notifications = $this->findNotificationMetadata($participant, true);
        foreach ($notifications as $notification) {
            $notification->setSeen(true);
        }
        $this->entityManager->flush();
    }


    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository($this->notificationEntity);
    }

    /**
     * @return EntityRepository
     */
    protected function getMetadataRepository()
    {
        return $this->entityManager->getRepository($this->metadataEntity);
    }
}