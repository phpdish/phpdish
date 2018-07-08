<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use PHPDish\Bundle\ForumBundle\Event\ReplyTopicEvent;
use PHPDish\Bundle\ForumBundle\Event\TopicEvent;
use PHPDish\Bundle\ForumBundle\Event\VoteTopicEvent;
use PHPDish\Bundle\PostBundle\Event\PostEvent;
use PHPDish\Bundle\UserBundle\Entity\PointHistory;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserEvent;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\PointManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PointSubscriber implements EventSubscriberInterface
{
    /**
     * @var PointManager
     */
    protected $pointManager;

    const POINTS = [
        PointHistory::TYPE_SIGN_IN => 100,
        PointHistory::TYPE_CHECK_IN => 10,

        //资源
        PointHistory::TYPE_POST_TOPIC => 10,
        PointHistory::TYPE_POST_ARTICLE => 10,
        // 资源被删除
        PointHistory::TYPE_REMOVE_TOPIC => 10,
        PointHistory::TYPE_REMOVE_POST => 10,

        PointHistory::TYPE_POST_TOPIC_REPLY => 5, //回复主题
        PointHistory::TYPE_TOPIC_REPLY => 5, //主题被回复，

        PointHistory::TYPE_TOPIC_VOTED => 5,
        PointHistory::TYPE_REPLY_VOTED => 5,
    ];

    public function __construct(PointManager $pointManager)
    {
        $this->pointManager = $pointManager;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::USER_CREATED => 'onRegister',
            //发布资源
            \PHPDish\Bundle\PostBundle\Event\Events::POST_CREATED => 'onPostCreated',
            \PHPDish\Bundle\ForumBundle\Event\Events::TOPIC_CREATED => 'onTopicCreated',
            //回复资源
            \PHPDish\Bundle\ForumBundle\Event\Events::TOPIC_REPLIED => 'onTopicReplied',
        ];
    }

    /**
     * 发布主题帖送积分，题主得积分
     *
     * @param ReplyTopicEvent $event
     */
    public function onTopicReplied(ReplyTopicEvent $event)
    {
        if ($event->getTopic()->getUser() !== $event->getReply()->getUser()) {
            // 题主送积分
            $this->sendPoints($event->getTopic()->getUser(), PointHistory::TYPE_TOPIC_REPLY);
        }
        // 答主送积分
//        $this->sendPoints($event->getReply()->getUser(), PointHistory::TYPE_POST_TOPIC_REPLY);
    }

    /**
     * 发布主题帖送积分
     *
     * @param TopicEvent $event
     */
    public function onTopicCreated(TopicEvent $event)
    {
        $this->sendPoints($event->getTopic()->getUser(), PointHistory::TYPE_POST_TOPIC);
    }

    /**
     * 发布文章送积分
     *
     * @param PostEvent $event
     */
    public function onPostCreated(PostEvent $event)
    {
        $this->sendPoints($event->getPost()->getUser(), PointHistory::TYPE_POST_ARTICLE);
    }

    /**
     * 注册送积分
     * @param UserEvent $event
     */
    public function onRegister(UserEvent $event)
    {
        $this->sendPoints($event->getUser(), PointHistory::TYPE_SIGN_IN);
    }

    protected function sendPoints(UserInterface $user, $type)
    {
        $history = $this->pointManager->createPointHistory(
            $user,
            static::POINTS[$type],
            $type
        );
        $this->pointManager->savePointHistory($history);
    }
}