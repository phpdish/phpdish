<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Source;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\QueryBuilder;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;
use PHPDish\Bundle\AdminBundle\Grid\GridInterface;

class ORM implements SourceInterface
{
    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var string
     */
    protected $entity;

    /**
     * @var string
     */
    protected $alias;

    /**
     * @var QueryBuilder
     */
    protected $queryBuilder;

    protected $initialized = false;

    /**
     * @var ClassMetadata
     */
    protected $metadata;

    /**
     * @var string
     */
    protected $class;

    public function __construct($entity, $alias = '_a')
    {
        $this->entity = $entity;
        $this->alias = $alias;
    }

    public function setEntityManager(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    protected function initialize()
    {
        if ($this->initialized) {
            return;
        }
        $this->metadata = $this->entityManager->getClassMetadata($this->entity);
        $this->class = $this->metadata->getName();
    }

    protected function createQueryBuilder()
    {
        return $this->entityManager->createQueryBuilder()
            ->from($this->class, $this->alias);
    }

    /**
     * {@inheritdoc}
     */
    public function loadSource(array $columns, $page = 1, $limit = GridInterface::MAX_RESULTS_NUM)
    {
        $this->initialize();
        $qb = $this->createQueryBuilder();
        //应用过滤条件
        $this->applyFilters($qb, $columns);
        //应用排序
        $this->applyOrders($qb, $columns);
        $adapter = new DoctrineORMAdapter($qb->getQuery());
        $pagerfanta = new Pagerfanta($adapter);
        $pagerfanta->setCurrentPage($page)->setMaxPerPage($limit);
        return $pagerfanta;
    }

    /**
     * @param QueryBuilder $qb
     * @param ColumnInterface[] $columns
     */
    protected function applyOrders(QueryBuilder $qb, $columns)
    {
        foreach ($columns as $column) {
            if (!$column->isSortable()) {
                continue;
            }
            $qb->addOrderBy($column->getName(), $column->getOrder);
        }
    }

    /**
     * @param QueryBuilder $qb
     * @param ColumnInterface[] $columns
     */
    protected function applyFilters(QueryBuilder $qb, $columns)
    {
        $expr = $qb->expr()->andX();
        foreach ($columns as $column) {
            if (!$column->isFilterable()) {
                continue;
            }
            //应用该字段所有的filter
            $exprJunction = $qb->expr()->andX();
            foreach ($column->getFilters() as $filter) {
                $exprJunction->add($filter->getComparison());
            }
            $expr->add($exprJunction);
        }
        $qb->where($expr);
    }
}