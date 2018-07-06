<?php

namespace PHPDish\Bundle\UserBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

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
    protected $isIncome;

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