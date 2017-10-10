<?php

namespace PHPDish\Bundle\ChatBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\ChatBundle\Entity\Chat;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class ChatManager implements ChatManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * {@inheritdoc}
     */
    public function createChat(UserInterface $recipient, UserInterface $sender, $body)
    {
        $chat = new Chat();
        $chat->setRecipient($recipient)
            ->setSender($sender)
            ->setBody($body)
            ->setCreatedAt(Carbon::now());
    }
}