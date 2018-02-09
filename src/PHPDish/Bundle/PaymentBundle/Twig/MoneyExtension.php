<?php

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