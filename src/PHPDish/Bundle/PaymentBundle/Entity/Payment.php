<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
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
     * @ORM\Column(type="integer")
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
     * @ORM\Column(type="string", length=50)
     * @var string
     */
    protected $paymentType;

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
     * @ORM\Column(type="string")
     * @var string
     */
    protected $description;

    /**
     * @ORM\Column(type="string")
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
    public function getPaymentType()
    {
        return $this->paymentType;
    }

    /**
     * @param string $paymentType
     * @return Payment
     */
    public function setPaymentType($paymentType)
    {
        $this->paymentType = $paymentType;

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
}