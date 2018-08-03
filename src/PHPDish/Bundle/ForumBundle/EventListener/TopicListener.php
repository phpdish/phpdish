<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Doctrine\ORM\Mapping\PostUpdate;

final class TopicListener
{
    /**
     * @var TopicManagerInterface
     */
    protected $topicManager;

    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    public function __construct(
        TopicManagerInterface $topicManager,
        UserManagerInterface $userManager
    )
    {
        $this->topicManager = $topicManager;
        $this->userManager = $userManager;
    }

    /**
     * 生成新数据之前
     * @param TopicInterface $topic
     * @param LifecycleEventArgs $event
     */
    public function postPersist(TopicInterface $topic, LifecycleEventArgs $event)
    {
        $user = $topic->getUser();
        $this->handleUserTopicCount($user);
    }

    /**
     * 处理用户的话题数量
     * @param UserInterface $user
     */
    protected function handleUserTopicCount(UserInterface $user)
    {
        $count = $this->topicManager->getUserTopicCount($user);
        $user->setTopicCount($count);
        $this->userManager->saveUser($user);
    }
}