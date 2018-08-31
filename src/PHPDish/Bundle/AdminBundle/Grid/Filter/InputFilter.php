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

    public function setValue($value)
    {
        $this->value = $value;
    }

    public function getComparison()
    {
        $this->assertComparable();
        return new Comparison($this->column->getName(), $this->operator, $this->value);
    }
}