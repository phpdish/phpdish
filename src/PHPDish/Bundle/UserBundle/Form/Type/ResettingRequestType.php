<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use PHPDish\Bundle\PostBundle\Form\Type\ChapterType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

class ResettingRequestType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextareaType::class)
            ->add('captcha', ChapterType::class, [
                'width' => 120,
                'height' => 40
            ]);
    }
}