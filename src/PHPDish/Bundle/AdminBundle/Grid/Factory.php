<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid;

use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\AdminBundle\Grid\Column\Column;
use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;
use PHPDish\Bundle\AdminBundle\Grid\Filter\InputFilter;
use PHPDish\Bundle\AdminBundle\Grid\Source\ORM;
use PHPDish\Bundle\AdminBundle\Grid\Source\SourceInterface;

class Factory
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
     * 创建column
     *
     * @param string $name
     * @param string $type
     * @param array $options
     * @return ColumnInterface
     */
    public function createColumn($name, $type, $options = [])
    {
        $column = new Column($name, $type, $options['sortable'] ?? true);
        if ($options['filterable']) { //如果默认开启filter，则帮其生成一个默认的input filter
            $column->addFilter(new InputFilter(Operator::LIKE));
        }
        return $column;
    }

    /**
     * 创建 grid
     *
     * @param SourceInterface|string $source
     * @param string|null $alias
     * @return GridInterface
     */
    public function createGrid($source, $alias = null)
    {
        $source = $this->createSource($source, $alias);
        $grid = new Grid($source);
        $grid->setFactory($this);
        return $grid;
    }

    public function createSource($entity, $alias = null)
    {
        $source = new ORM($entity, $alias);
        $source->setEntityManager($this->entityManager);
        return $source;
    }
}