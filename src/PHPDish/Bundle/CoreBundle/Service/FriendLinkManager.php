<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */
declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Service;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Model\FriendLink;

class FriendLinkManager implements FriendLinkManagerInterface
{
    /**
     * @var EntityRepository
     */
    protected $friendLinkRepository;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
//        $this->friendLinkRepository = $this->entityManager
//            ->getRepository('PHPDishWebBundle:FriendLink');
    }

    /**
     * {@inheritdoc}
     */
    public function findEnabledFriendLinks($limit)
    {
        return $this->friendLinkRepository->findBy([], ['priority' => 'asc'], $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function saveFriendLink(FriendLink $friendLink)
    {
        $this->entityManager->persist($friendLink);
        $this->entityManager->flush();
    }
}