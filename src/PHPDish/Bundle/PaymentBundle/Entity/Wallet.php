<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;

/**
 * @ORM\Entity()
 * @ORM\Table(name="wallets")
 */
class Wallet implements WalletInterface
{
    use IdentifiableTrait, DateTimeTrait;

    /**
     * 余额，单位分
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $amount = 0;

    /**
     * @ORM\OneToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="wallet")
     */
    protected $user;

    /**
     * @ORM\OneToMany(targetEntity="Payment", mappedBy="wallet")
     */
    protected $histories;

    /**
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     * @return Wallet
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * {@inheritdoc}
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getHistories()
    {
        return $this->histories;
    }

    /**
     * {@inheritdoc}
     */
    public function setHistories($histories)
    {
        $this->histories = $histories;

        return $this;
    }

    /**
     * 添加一条记录
     * @param WalletHistoryInterface $history
     */
    public function addHistory(WalletHistoryInterface $history)
    {
        $this->histories[] = $history;
    }
}