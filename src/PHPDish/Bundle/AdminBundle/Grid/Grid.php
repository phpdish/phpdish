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
     * @var ColumnInterface[]
     */
    protected $columns;

    /**
     * @var bool
     */
    protected $dataLoaded = false;

    /**
     * @var Factory
     */
    protected $factory;

    /**
     * @var SourceInterface
     */
    protected $source;

    public function __construct(Factory $factory)
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

    public function addColumn($column, $type, $options = [])
    {
        if (!$column instanceof ColumnInterface) {
            $column = $this->factory->createColumn($column, $type, $options);
        }
        $this->columns[] = $column;
    }

    public function render($template = null)
    {

    }
    protected function applySource()
    {
        $this->source->fetchSource($this->columns);
    }
}