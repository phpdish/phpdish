<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use FOS\UserBundle\Form\Type\RegistrationFormType as FOSRegistrationFormType;
use Gregwar\CaptchaBundle\Type\CaptchaType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('captcha', CaptchaType::class, [
            'width' => 120,
            'height' => 40
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return FOSRegistrationFormType::class;
    }
}