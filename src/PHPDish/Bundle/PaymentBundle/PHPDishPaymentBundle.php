<?php

namespace PHPDish\Bundle\PaymentBundle;

use PHPDish\Bundle\PaymentBundle\DependencyInjection\PHPDishPaymentExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class PHPDishPaymentBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        if (null === $this->extension) {
            $this->extension = new PHPDishPaymentExtension();
        }
        return $this->extension;
    }
}
