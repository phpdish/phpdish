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
                    '同意' => 'approve',
                    '拒绝' => 'decline',
                ],
                'label' => '操作',
            ])
            ->add('note', TextareaType::class, [
                'label' => '备注'
            ]);
    }
}