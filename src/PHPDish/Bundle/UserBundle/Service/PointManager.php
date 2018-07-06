<?php

namespace PHPDish\Bundle\UserBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\UserBundle\Entity\PointHistory;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class PointManager
{
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
    public function createPointHistory(UserInterface $user, $amount, $type = PointHistory::TYPE_AWARD)
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
}