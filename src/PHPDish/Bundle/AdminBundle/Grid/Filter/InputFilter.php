<?php

/*
 * This file is part of the DataGridBundle.
 *
 * (c) Abhoryo <abhoryo@free.fr>
 * (c) Stanislav Turza
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Filter;

use Doctrine\ORM\Query\Expr\Comparison;

class InputFilter extends AbstractFilter
{
    /**
     * @var string
     */
    protected $value;

    public function __construct($operator)
    {
        $this->operator = $operator;
    }

    /**
     * {@inheritdoc}
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

    /**
     * {@inheritdoc}
     */
    public function getComparison()
    {
        $this->assertComparable();
        return new Comparison($this->column->getName(), $this->operator, $this->value);
    }

    /**
     * {@inheritdoc}
     */
    public function initialize($data)
    {
        $this->value = $data['value'];
        // input filter 允许自己调整operator
        if (isset($data['operator'])) {
            $this->operator = $data['operator'];
        }
    }
}