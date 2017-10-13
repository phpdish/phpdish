<?php

namespace PHPDish\Bundle\ChatBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\ChatBundle\Entity\Chat;
use PHPDish\Bundle\ChatBundle\Model\ChatInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class ChatManager implements ChatManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $chatRepository;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->chatRepository = $entityManager->getRepository('PHPDishChatBundle:Chat');
    }

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
        $this->saveChat($chat);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserChatsWithSender(UserInterface $recipient, UserInterface $sender, $page, $limit)
    {
        return $this->chatRepository->createQueryBuilder('c')
            ->select('c')
            ->where('c.recipient = :recipientId and c.sender = :senderId')
            ->setParameters([
                'recipientId' => $recipient,
                'senderId' => $sender,
            ])
            ->getQuery()
            ->getResult();
    }

    /**
     * @param ChatInterface $chat
     */
    protected function saveChat(ChatInterface $chat)
    {
        $this->entityManager->persist($chat);
        $this->entityManager->flush();
    }
}
