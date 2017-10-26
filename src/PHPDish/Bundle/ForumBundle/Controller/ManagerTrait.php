<?php

namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\ForumBundle\Service\ReplyManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;

trait ManagerTrait
{
    /**
     * @return ThreadManagerInterface
     */
    protected function getThreadManager()
    {
        return $this->get('phpdish.manager.thread');
    }

    /**
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->get('phpdish.manager.topic');
    }

    /**
     * @return ReplyManagerInterface
     */
    protected function getReplyManager()
    {
        return $this->get('phpdish.manager.reply');
    }
}
