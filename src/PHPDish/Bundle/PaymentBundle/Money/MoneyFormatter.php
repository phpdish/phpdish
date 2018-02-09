<?php

namespace PHPDish\Bundle\PaymentBundle\Money;

use Money\Currencies;
use Money\Currency;
use Money\Formatter\IntlMoneyFormatter;
use Money\Money;

class MoneyFormatter
{
    /**
     * @var Currencies
     */
    protected $currencies;

    protected $formatter;

    public function __construct()
    {
        $this->currencies = new Currencies\ISOCurrencies();
        $numberFormatter = new \NumberFormatter('zh_CN', \NumberFormatter::CURRENCY);
        $this->formatter = new IntlMoneyFormatter($numberFormatter, $this->currencies);
    }

    /**
     * 输出价格表达式
     *
     * @param int|Money $money
     * @return string
     */
    public function format($money)
    {
        if (!$money instanceof Money) {
            $money = new Money($money, new Currency('RMB'));
        }
        return $this->formatter->format($money);
    }
}