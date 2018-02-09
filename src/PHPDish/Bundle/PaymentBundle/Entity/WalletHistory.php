<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;

/**
 * @ORM\Entity()
 * @ORM\Table(name="wallet_histories")
 */
class WalletHistory implements WalletHistoryInterface
{
    use IdentifiableTrait, DateTimeTrait, EnabledTrait;

    /**
     * @ORM\Column(type="string", length=50)
     * @var string
     */
    protected $type;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $amount;

    /**
     * @ORM\ManyToOne(targetEntity="Wallet", inversedBy="histories")
     * @var WalletInterface
     */
    protected $wallet;

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return WalletHistory
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     * @return WalletHistory
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * @return WalletInterface
     */
    public function getWallet()
    {
        return $this->wallet;
    }

    /**
     * @param WalletInterface $wallet
     * @return WalletHistory
     */
    public function setWallet($wallet)
    {
        $this->wallet = $wallet;

        return $this;
    }
}