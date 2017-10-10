<?php

namespace PHPDish\Bundle\NotificationBundle\EventListener;


use PHPDish\Bundle\ForumBundle\Event\ReplyMentionUserEvent;
use PHPDish\Bundle\PostBundle\Event\CommentMentionUserEvent;

final class MentionUserListener extends EventListener
{
    /**
     * 当用户在文章评论中被提及
     * @param CommentMentionUserEvent $event
     */
    public function onUserMentionedInComment(CommentMentionUserEvent $event)
    {
        foreach ($event->getMentionedUsers() as $user) {
            $this->notificationManager->createAtUserInPostNotification($user, $event->getComment());
        }
    }

    /**
     * 当用户在话题回复中被提及
     * @param ReplyMentionUserEvent $event
     */
    public function onUserMentionedInReply(ReplyMentionUserEvent $event)
    {
        foreach ($event->getMentionedUsers() as $user) {
            $this->notificationManager->createAtUserInTopicNotification($user, $event->getReply());
        }
    }
}