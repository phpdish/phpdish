<?php
namespace PHPDish\Bundle\CoreBundle\Servuce;

use Doctrine\ORM\Query;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\DoctrineORMAdapter;

trait PaginatorTrait
{
    protected function getMaxPerPage()
    {
        return 10;
    }

    protected function createPaginator(Query $query, $page, $limit = null)
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($query));
        $paginator->setCurrentPage($page);
        $paginator->setMaxPerPage($limit ?: $this->getMaxPerPage());
        return $paginator;
    }
}