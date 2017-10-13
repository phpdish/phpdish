<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\PostBundle\Event\PostCommentedEvent;

class CommentPostListener extends EventListener
{
    /**
     * 文章被评论时触发.
     *
     * @param PostCommentedEvent $event
     *
     * @return bool
     */
    public function onPostCommented(PostCommentedEvent $event)
    {
        if ($event->getPost()->getUser() === $event->getComment()->getUser()) {
            return false;
        }

        return $this->notificationManager->createCommentPostNotification($event->getPost(), $event->getComment()) !== false;
    }
}
