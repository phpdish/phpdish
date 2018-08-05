<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\ForumBundle\Service\ReplyManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;

trait ManagerTrait
{
    /**
     * @return ThreadManagerInterface
     */
    protected function getThreadManager()
    {
        return $this->get('phpdish_forum.manager.thread');
    }

    /**
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->get('phpdish_forum.manager.topic');
    }

    /**
     * @return ReplyManagerInterface
     */
    protected function getReplyManager()
    {
        return $this->get('phpdish_forum.manager.reply');
    }
}
