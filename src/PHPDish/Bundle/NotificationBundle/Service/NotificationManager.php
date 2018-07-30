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

use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class NotificationManager implements NotificationManagerInterface
{
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

    public function markAllAsSeen(UserInterface $participant)
    {
        // TODO: Implement markAllAsSeen() method.
    }

    public function markAsSeen(UserInterface $participant, NotificationInterface $notification)
    {
        
    }
}