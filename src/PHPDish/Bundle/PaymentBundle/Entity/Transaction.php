<?php

namespace PHPDish\Bundle\PaymentBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PaymentBundle\Model\TransactionInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="transactions", indexes={
 *     @ORM\Index(columns="serial_no")
 * })
 */
class Transaction implements TransactionInterface
{
    use IdentifiableTrait, DateTimeTrait, EnabledTrait, UserAwareTrait;

    protected $payable;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $serialNo;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @var UserInterface
     */
    protected $user;

    /**
     * @return mixed
     */
    public function getPayable()
    {
        return $this->payable;
    }

    /**
     * @param mixed $payable
     * @return Transaction
     */
    public function setPayable($payable)
    {
        $this->payable = $payable;

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
     * @return Transaction
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
     * @return Transaction
     */
    public function setUser(UserInterface $user)
    {
        $this->user = $user;

        return $this;
    }
}