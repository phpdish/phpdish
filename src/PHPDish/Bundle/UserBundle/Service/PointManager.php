<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class PointManager implements PointManagerInterface, ServiceManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    protected $pointHistoryEntity;

    public function __construct($pointHistoryEntity, EntityManagerInterface $entityManager)
    {
        $this->pointHistoryEntity = $pointHistoryEntity;
        $this->entityManager = $entityManager;
    }

    /**
     * @return EntityRepository
     */
    public function getPointHistoryRepository()
    {
        return $this->entityManager->getRepository($this->pointHistoryEntity);
    }

    /**
     * {@inheritdoc}
     */
    public function createPointHistory(UserInterface $user, $amount, $type = null)
    {
        $history = new $this->pointHistoryEntity;
        $history->setUser($user)
            ->setAmount($amount)
            ->setType($type);
        return $history;
    }

    /**
     * {@inheritdoc}
     */
    public function savePointHistory(PointHistoryInterface $history)
    {
        $this->entityManager->persist($history);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function findPointHistories(UserInterface $user, $page, $limit = null)
    {
        $query = $this->getPointHistoryRepository()->createQueryBuilder('p')
            ->where('p.user = :user')->setParameter('user', $user)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'pointHistoryEntity' => PointHistoryInterface::class
        ];
    }
}