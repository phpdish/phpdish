<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use PHPDish\Bundle\UserBundle\Entity\Profile;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProfileType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('url', UrlType::class, [
                'label' => '个人主页',
            ])
            ->add('location', TextType::class, [
                'label' => '城市',
            ])
            ->add('company', TextType::class, [
                'label' => '公司',
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'profile';
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Profile::class,
        ));
    }
}
