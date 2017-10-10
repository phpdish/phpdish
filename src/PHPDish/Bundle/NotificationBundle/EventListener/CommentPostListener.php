<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;

use PHPDish\Bundle\PostBundle\Event\PostCommentedEvent;

class CommentPostListener extends EventListener
{
    /**
     * 文章被评论时触发
     * @param PostCommentedEvent $event
     */
    public function onPostCommented(PostCommentedEvent $event)
    {
        $this->notificationManager->createCommentPostNotification($event->getPost(), $event->getComment());
    }
}