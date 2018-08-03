<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PaymentBundle\Twig;

use PHPDish\Bundle\PaymentBundle\Money\MoneyFormatter;

class MoneyExtension extends \Twig_Extension
{
    /**
     * @var MoneyFormatter
     */
    protected $moneyFormatter;

    public function __construct(MoneyFormatter $moneyFormatter)
    {
        $this->moneyFormatter = $moneyFormatter;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('money', [$this->moneyFormatter, 'format'])
        ];
    }
}