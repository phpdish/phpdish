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
        $parentOptions = [
            'class' => 'PHPDishPostBundle:Post',
            'choice_label' => 'title',
            'choices' => $options['book']->getSummary(),
            'label' => 'form.chapter.own_chapter',
            'placeholder' => 'form.chapter.top_chapter',
            'required' => false
        ];
        if ($options['default_character']) {
            $parentOptions['data'] = $options['default_character'];
        }
        $builder
            ->add('title', TextType::class, [
                'label' => 'form.chapter.title',
            ])
            ->add('parent', EntityType::class, $parentOptions)
            ->add('originalBody', TextareaType::class, [
                'label' => 'form.chapter.body',
            ]);
    }
}