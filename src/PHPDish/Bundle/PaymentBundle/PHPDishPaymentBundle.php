<?php

namespace PHPDish\Bundle\PaymentBundle;

use PHPDish\Bundle\PaymentBundle\DependencyInjection\PHPDishPaymentExtension;
use PHPDish\Bundle\ResourceBundle\AbstractBundle;

class PHPDishPaymentBundle extends AbstractBundle
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
