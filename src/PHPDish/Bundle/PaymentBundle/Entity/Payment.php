<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use JMS\Serializer\Annotation as Serializer;
use Money\Money;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;
use Ramsey\Uuid\Uuid;

class Payment implements PaymentInterface
{
    use IdentifiableTrait, DateTimeTrait, EnabledTrait, UserAwareTrait;

    /**
     * @var int
     */
    protected $payableId;

    /**
     * @var string
     */
    protected $serialNo;

    /**
     * @var UserInterface
     * @Serializer\Groups({"Details"})
     */
    protected $user;

    /**
     * @var WalletInterface
     * @Serializer\Groups({"Details"})
     */
    protected $wallet;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var string
     */
    protected $status;

    /**
     * @var int
     */
    protected $amount;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var array
     */
    protected $parameters;

    /**
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