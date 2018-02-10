<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use Money\Money;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Rhumsaa\Uuid\Exception\UnsatisfiedDependencyException;
use Rhumsaa\Uuid\Uuid;

/**
 * @ORM\Entity
 * @ORM\Table(name="payments", indexes={
 *     @ORM\Index(columns="serial_no"),
 *     @ORM\Index(columns="qr_id")
 * })
 */
class Payment implements PaymentInterface
{
    use IdentifiableTrait, DateTimeTrait, EnabledTrait, UserAwareTrait;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @var int
     */
    protected $payableId;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @var string
     */
    protected $serialNo;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @var UserInterface
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Wallet", inversedBy="histories", cascade={"persist"})
     * @var WalletInterface
     */
    protected $wallet;

    /**
     * @ORM\Column(type="string", length=50)
     * @var string
     */
    protected $type;

    /**
     * @ORM\Column(type="string", length=50)
     * @var string
     */
    protected $status;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $amount;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @var string
     */
    protected $description;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     * @var array
     */
    protected $parameters;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @var string
     */
    protected $qrId;

    public function __construct()
    {
        try {
            $this->serialNo = Uuid::uuid1();
        } catch (UnsatisfiedDependencyException $exception) {
        }
    }

    /**
     * @return int
     */
    public function getPayableId()
    {
        return $this->payableId;
    }

    /**
     * @param int $payableId
     * @return Payment
     */
    public function setPayableId($payableId)
    {
        $this->payableId = $payableId;

        return $this;
    }

    /**
     * @return string
     */
    public function getSerialNo()
    {
        return $this->serialNo;
    }

    /**
     * @param string $serialNo
     * @return Payment
     */
    public function setSerialNo($serialNo)
    {
        $this->serialNo = $serialNo;

        return $this;
    }

    /**
     * @return UserInterface
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param UserInterface $user
     * @return Payment
     */
    public function setUser(UserInterface $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Payment
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     * @return Payment
     */
    public function setStatus($status)
    {
        $this->status = $status;

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
     * @return Payment
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return Payment
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return string
     */
    public function getQrId()
    {
        return $this->qrId;
    }

    /**
     * @param string $qrId
     * @return Payment
     */
    public function setQrId($qrId)
    {
        $this->qrId = $qrId;

        return $this;
    }

    /**
     * @return array
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * @param array $parameters
     * @return Payment
     */
    public function setParameters($parameters)
    {
        $this->parameters = $parameters;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getWallet()
    {
        return $this->wallet;
    }

    /**
     * {@inheritdoc}
     */
    public function setWallet(WalletInterface $wallet)
    {
        $this->wallet = $wallet;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function isIncome()
    {
        return in_array($this->type, [
            static::TYPE_CATEGORY_INCOME,
            static::TYPE_BOOK_INCOME,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getPrice()
    {
        return Money::CNY($this->amount);
    }
}