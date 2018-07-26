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
use PHPDish\Bundle\UserBundle\Model\PointHistory;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class PointManager
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @return EntityRepository
     */
    public function getPointHistoryRepository()
    {
        return $this->entityManager->getRepository('PHPDishUserBundle:PointHistory');
    }

    /**
     * 创建积分收益
     *
     * @param UserInterface $user
     * @param int $amount
     * @param string $type
     * @return PointHistory
     */
    public function createPointHistory(UserInterface $user, $amount, $type = null)
    {
        $history = new PointHistory();
        $history->setUser($user)
            ->setAmount($amount)
            ->setType($type);
        return $history;
    }

    /**
     * 保存历史
     *
     * @param PointHistoryInterface $history
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
}