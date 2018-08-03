<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Model;

use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class NotificationMetadata implements NotificationMetadataInterface
{
    use IdentifiableTrait;

    /**
     * @var UserInterface
     */
    protected $participant;

    /**
     * @var NotificationInterface
     */
    protected $notification;

    /**
     * @var boolean
     */
    protected $seen;

    /**
     * @return UserInterface
     */
    public function getParticipant()
    {
        return $this->participant;
    }

    /**
     * @param UserInterface $participant
     * @return NotificationMetadata
     */
    public function setParticipant(UserInterface $participant)
    {
        $this->participant = $participant;
        return $this;
    }

    /**
     * @return NotificationInterface
     */
    public function getNotification()
    {
        return $this->notification;
    }

    /**
     * @param NotificationInterface $notification
     * @return NotificationMetadata
     */
    public function setNotification(NotificationInterface $notification)
    {
        $this->notification = $notification;
        return $this;
    }

    /**
     * @return bool
     */
    public function isSeen()
    {
        return $this->seen;
    }

    /**
     * @param bool $seen
     * @return NotificationMetadata
     */
    public function setSeen($seen)
    {
        $this->seen = $seen;
        return $this;
    }
}