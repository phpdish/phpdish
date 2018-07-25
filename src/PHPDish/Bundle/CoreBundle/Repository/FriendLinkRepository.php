<?php

namespace PHPDish\Bundle\CoreBundle\Repository;

use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Model\FriendLink;

class FriendLinkRepository extends EntityRepository
{
    /**
     * 获取友情链接列表.
     *
     * @param int $limit
     *
     * @return FriendLink[]
     */
    public function findList($limit)
    {
        return $this->createQueryBuilder('f')
            ->orderBy('f.priority', 'ASC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
