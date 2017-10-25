<?php

namespace PHPDish\Bundle\NotificationBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class TimelineManager implements TimelineManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $notificationRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->notificationRepository = $entityManager->getRepository('PHPDishNotificationBundle:Notification');
    }

    /**
     * {@inheritdoc}
     */
    public function findUserActions(UserInterface $user, $page, $limit = null)
    {
        $query = $this->notificationRepository->createQueryBuilder('n')
            ->where('n.fromUser = :user')->setParameter('user', $user)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }
}
