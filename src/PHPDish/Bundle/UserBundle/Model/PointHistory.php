<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Model;

use PHPDish\Bundle\ResourceBundle\Model\DateTimeTrait;
use PHPDish\Bundle\ResourceBundle\Model\EnabledTrait;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class PointHistory implements PointHistoryInterface
{
    use IdentifiableTrait, UserAwareTrait, DateTimeTrait, EnabledTrait;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var boolean
     */
    protected $isIncome = true;

    /**
     * @var int
     */
    protected $amount;

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return PointHistory
     */
    public function setType(string $type): PointHistory
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return bool
     */
    public function isIncome(): bool
    {
        return $this->isIncome;
    }

    /**
     * @param bool $isIncome
     * @return PointHistory
     */
    public function setIsIncome(bool $isIncome): PointHistory
    {
        $this->isIncome = $isIncome;

        return $this;
    }

    /**
     * @return int
     */
    public function getAmount(): int
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     * @return PointHistory
     */
    public function setAmount(int $amount): PointHistory
    {
        $this->amount = $amount;

        return $this;
    }
}