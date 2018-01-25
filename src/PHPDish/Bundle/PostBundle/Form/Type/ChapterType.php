<?php

namespace PHPDish\Bundle\PostBundle\Form\Type;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChapterType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('book')
            ->setDefault('default_character', null)
            ->setDefaults([
                'validation_groups' => ['Default', 'chapter']
            ]);
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => '标题',
            ])
            ->add('parent', EntityType::class, [
                'class' => 'PHPDishPostBundle:Post',
                'choice_label' => 'title',
                'choices' => $options['book']->getSummary(),
                'label' => '所属章节',
                'data' => $options['default_character'],
                'placeholder' => '顶级章节',
                'required' => false
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => '内容',
            ]);
    }
}