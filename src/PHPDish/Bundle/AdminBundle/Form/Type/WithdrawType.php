<?php

namespace PHPDish\Bundle\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class WithdrawType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('action', ChoiceType::class, [
                'choices' => [
                    'payment.form.action.approve' => 'approve',
                    'payment.form.action.decline' => 'decline',
                ],
                'label' => 'payment.form.action.action',
            ])
            ->add('note', TextareaType::class, [
                'label' => 'payment.form.note'
            ]);
    }
}