<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Twig;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Service\ReplyManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;

class TopicExtension extends \Twig_Extension
{
    protected $threadManager;

    /**
     * @var TopicManagerInterface
     */
    protected $topicManager;

    /**
     * @var ReplyManagerInterface
     */
    protected $replyManager;

    public function __construct(
        ThreadManagerInterface $threadManager,
        TopicManagerInterface $topicManager,
        ReplyManagerInterface $replyManager
    )
    {
        $this->threadManager = $threadManager;
        $this->topicManager = $topicManager;
        $this->replyManager = $replyManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions(): array
    {
        return [
            new \Twig_SimpleFunction('get_thread', [$this->threadManager, 'findThreadById']),
            new \Twig_SimpleFunction('get_thread_by_slug', [$this->threadManager, 'findThreadBySlug']),
            new \Twig_SimpleFunction('get_threads', [$this, 'getThreads']),
            new \Twig_SimpleFunction('get_threads_pager', [$this->threadManager, 'findThreadsPager']),

            new \Twig_SimpleFunction('get_topic', [$this->topicManager, 'findTopicById']),
            new \Twig_SimpleFunction('get_topics', [$this, 'getTopics']),
            new \Twig_SimpleFunction('get_topics_pager', [$this->topicManager, 'findTopicsPager']),
            new \Twig_SimpleFunction('get_topics_pager_by_thread', [$this->topicManager, 'findThreadTopics']),

            new \Twig_SimpleFunction('get_reply', [$this->replyManager, 'findReplyById']),
            new \Twig_SimpleFunction('get_replies', [$this, 'getReplies']),
            new \Twig_SimpleFunction('get_replies_pager', [$this->replyManager, 'findRepliesPager']),
        ];
    }

    /**
     * 指定条件查找节点
     *
     * @param array| $criteria
     * @param array $orderBy
     * @param int $limit
     * @return array
     */
    public function getThreads($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->threadManager->findThreads($criteria);
        } else {
            return $this->threadManager->getThreadRepository()->findBy($criteria, $orderBy, $limit);
        }
    }

    /**
     * 指定条件查找话题
     *
     * @param array| $criteria
     * @param array $orderBy
     * @param int $limit
     * @return array
     */
    public function getTopics($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->topicManager->findTopics($criteria);
        } else {
            return $this->topicManager->getTopicRepository()->findBy($criteria, $orderBy, $limit);
        }
    }

    /**
     * 查找回复
     *
     * @param array|Criteria $criteria
     * @param array $orderBy
     * @param int|null $limit
     * @return ReplyInterface[]|Collection
     */
    public function getReplies($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->replyManager->findReplies($criteria);
        } else {
            return $this->replyManager->getReplyRepository()->findBy($criteria, $orderBy, $limit);
        }
    }
}