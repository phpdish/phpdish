<?php

namespace PHPDish\Bundle\NotificationBundle\Entity;

use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class ReplyTopicNotification extends Notification
{
    public function __construct(TopicInterface $topic, UserInterface $user)
    {
    }
}
