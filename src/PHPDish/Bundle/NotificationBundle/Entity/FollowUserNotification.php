<?php

namespace PHPDish\Bundle\NotificationBundle\Entity;

use Carbon\Carbon;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class FollowUserNotification extends Notification
{
    public function __construct(UserInterface $user, UserInterface $fromUser)
    {
        $this->setUser($user);
        $this->setFromUser($fromUser);
        $this->setSubject(static::SUBJECT_FOLLOW_USER);
        $this->setCreatedAt(Carbon::now());
    }

    public function setFollower(UserInterface $user)
    {
        $this->setFromUser($user);
    }

    public function getFollower()
    {
        return $this->getFromUser();
    }
}
