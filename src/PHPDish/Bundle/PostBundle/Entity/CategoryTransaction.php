<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\PaymentBundle\Entity\Transaction;

/**
 * @ORM\Entity
 */
class CategoryTransaction extends Transaction
{
}