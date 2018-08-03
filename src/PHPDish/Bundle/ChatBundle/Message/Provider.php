<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ChatBundle\Message;

use FOS\MessageBundle\Provider\Provider as BaseProvider;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;

class Provider extends BaseProvider
{
    use PaginatorTrait;

    /**
     * 获取已读消息
     * @param int $page
     * @param null $limit
     * @return Pagerfanta
     */
    public function getInboxThreadsPager($page, $limit = null)
    {
        $participant = $this->getAuthenticatedParticipant();

        $query = $this->threadManager
            ->getParticipantInboxThreadsQueryBuilder($participant)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * 获取已发送消息
     *
     * @param int $page
     * @param null $limit
     * @return Pagerfanta
     */
    public function getSentThreadsPager($page, $limit = null)
    {
        $participant = $this->getAuthenticatedParticipant();

        $query = $this->threadManager
            ->getParticipantSentThreadsQueryBuilder($participant)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }
}