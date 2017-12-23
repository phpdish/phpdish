<?php

namespace PHPDish\Bundle\ChatBundle\Message;

use FOS\MessageBundle\Provider\Provider as BaseProvider;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;

class Provider extends BaseProvider
{
    use PaginatorTrait;

    /**
     * 获取已读消息
     * @param int $page
     * @param null $limit
     * @return \Pagerfanta\Pagerfanta
     */
    public function getInboxThreadsPaginator($page, $limit = null)
    {
        $participant = $this->getAuthenticatedParticipant();

        $query = $this->threadManager
            ->getParticipantInboxThreadsQueryBuilder($participant)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * 获取已发送消息
     * @param int $page
     * @param null $limit
     * @return \Pagerfanta\Pagerfanta
     */
    public function getSentThreadsPaginator($page, $limit = null)
    {
        $participant = $this->getAuthenticatedParticipant();

        $query = $this->threadManager
            ->getParticipantSentThreadsQueryBuilder($participant)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }
}