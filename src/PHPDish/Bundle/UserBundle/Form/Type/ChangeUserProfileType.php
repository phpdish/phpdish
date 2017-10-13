<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use PHPDish\Bundle\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChangeUserProfileType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('gender', ChoiceType::class, [
                'choices' => [
                     '男' => User::GENDER_MEN,
                     '女' => User::GENDER_WOMEN
                ],
                'placeholder' => '未选择',
                'label' => '性别'
            ])
            ->add('email', TextType::class, [
                'label' => '邮箱'
            ])
            ->add('profile', ProfileType::class);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class
        ]);
    }
}