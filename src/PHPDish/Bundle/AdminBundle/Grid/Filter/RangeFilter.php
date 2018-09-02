<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Filter;

class RangeFilter extends AbstractFilter
{
    protected $from;

    protected $to;

    public function __construct($from, $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    /**
     * {@inheritdoc}
     */
    public function getOperator()
    {
        return 'between';
    }

    /**
     * {@inheritdoc}
     */
    public function getComparison()
    {
        return $this->column->getName() . ' BETWEEN ' . $this->from . ' AND ' . $this->to;
    }

    /**
     * @return mixed
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @param mixed $from
     */
    public function setFrom($from)
    {
        $this->from = $from;
    }

    /**
     * @return mixed
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * @param mixed $to
     */
    public function setTo($to)
    {
        $this->to = $to;
    }

    /**
     * {@inheritdoc}
     */
    public function initialize($data)
    {
        isset($data['from']) && $this->from = $data['from'];
        isset($data['to']) && $this->from = $data['to'];
    }
}