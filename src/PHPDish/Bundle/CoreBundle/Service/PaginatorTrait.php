<?php

namespace PHPDish\Bundle\CoreBundle\Service;

use Doctrine\ORM\Query;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\DoctrineORMAdapter;

trait PaginatorTrait
{
    /**
     * @return int
     */
    public function getMaxPerPage()
    {
        return 10;
    }

    /**
     * 创建分页.
     *
     * @param Query    $query
     * @param int      $page
     * @param int|null $limit
     *
     * @return Pagerfanta
     */
    protected function createPaginator(Query $query, $page, $limit = null)
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($query));
        $paginator->setCurrentPage($page);
        $paginator->setMaxPerPage($limit ?: $this->getMaxPerPage());

        return $paginator;
    }
}
