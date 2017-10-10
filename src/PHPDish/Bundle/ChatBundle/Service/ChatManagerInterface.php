<?php

namespace PHPDish\Bundle\ChatBundle\Service;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\ChatBundle\Model\ChatInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ChatManagerInterface
{
    /**
     * 给用户发消息
     * @param UserInterface $recipient
     * @param UserInterface $sender
     * @param string $body
     * @return ChatInterface
     */
    public function createChat(UserInterface $recipient, UserInterface $sender, $body);

    /**
     * 获取和某人的对话
     * @param UserInterface $recipient
     * @param UserInterface $sender
     * @param int $page
     * @param int $limit
     * @return ChatInterface[]
     */
    public function findUserChatsWithSender(UserInterface $recipient, UserInterface $sender, $page, $limit);
}