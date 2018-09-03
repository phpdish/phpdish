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

use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\AdminBundle\Grid\Column\ColumnInterface;
use PHPDish\Bundle\AdminBundle\Grid\Source\SourceInterface;
use Symfony\Component\HttpFoundation\Request;

class Grid implements GridInterface
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var ColumnInterface[]|ArrayCollection
     */
    protected $columns;

    /**
     * @var array
     */
    protected $rows;

    /**
     * @var array
     */
    protected $entities;

    /**
     * @var Factory
     */
    protected $factory;

    /**
     * @var SourceInterface
     */
    protected $source;

    public function setFactory(Factory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * {@inheritdoc}
     */
    public function handleRequest(Request $request)
    {
        $this->request = $request;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getColumns()
    {
        return $this->columns;
    }

    /**
     * {@inheritdoc}
     */
    public function getRows()
    {
        return $this->rows;
    }

    /**
     * {@inheritdoc}
     */
    public function addColumn($column, $type, $options = [])
    {
        if (!$column instanceof ColumnInterface) {
            $column = $this->factory->createColumn($column, $type, $options);
        }
        $this->columns[$column->getName()] = $column;
    }

    /**
     * {@inheritdoc}
     */
    public function hasColumn($name)
    {
        return $this->columns->containsKey($name);
    }

    /**
     * {@inheritdoc}
     */
    public function getColumn($name)
    {
        return $this->columns->get($name);
    }

    /**
     * {@inheritdoc}
     */
    public function initialize()
    {
        $this->loadEntities();  //加载数据
        $this->prepareRows(); //初始化rows
    }

    protected function prepareRows()
    {
        foreach ($this->entities as $entity) {
            $row = [];
            foreach ($this->columns as $column) {
                $row[$column->getName()] = $entity->getUsername();
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    protected function loadEntities()
    {
        if ($this->request) {
            if ($filters = $this->request->get('filters')) {
                $this->applyFilters($filters);
            }
        }
        $this->data = $this->source->loadSource($this->columns);
    }

    /**
     * [
     *    'filters' => [
     *        ['column' => 'age', 'operator' => 'lt', 'value' => 18],
     *        ['column' => 'age', 'operator' => 'gt', 'value' => 5],
     *        ['column' => 'age', 'operator' => 'between', 'from' => 5, to => 18],
     *        'username' => 'slince',
     *    ]
     * ]
     * @param array $filterItems
     */
    protected function applyFilters(array $filterItems)
    {
        foreach ($filterItems as $columnName => $filterItem) {
            if (is_numeric($columnName)) {
                if (!is_array($filterItem)) {  //不是符合条件的filter格式，跳过
                    continue;
                }
                $columnName = $filterItem['column'];
            } else {
                //key-value 模式,只能是input filter
                $filterItem = [
                    'column' => $columnName,
                    'operator' => null,
                    'value' => $filterItem
                ];
            }

            //如果没有该列则跳过
            if (!$this->hasColumn($columnName)) {
                continue;
            }

            $column = $this->getColumn($columnName);
            if ($filter = $column->getFilterByOperator($filterItem['operator'])) {
                $filter->initialize($filterItem);
            }
        }
    }
}