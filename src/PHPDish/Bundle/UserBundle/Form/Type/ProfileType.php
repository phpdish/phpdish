<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use PHPDish\Bundle\UserBundle\Model\Profile;
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
                'label' => 'form.profile.url',
            ])
            ->add('location', TextType::class, [
                'label' => 'form.profile.location',
            ])
            ->add('company', TextType::class, [
                'label' => 'form.profile.company',
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
            'data_class' => Profile::class
        ));
    }
}
