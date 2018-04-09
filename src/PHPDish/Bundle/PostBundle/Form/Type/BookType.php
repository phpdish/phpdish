<?php

namespace PHPDish\Bundle\PostBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', TextType::class, [
                'label' => 'form.book.name',
            ])
            ->add('description', TextareaType::class, [
                'label' => 'form.book.description',
            ])
            ->add('charge', HiddenType::class, [
                'label' => 'form.book.charge',
            ])
            ->add('slug', TextType::class, [
                'label' => 'form.book.slug',
            ])
            ->add('cover', HiddenType::class, [
                'label' => 'form.book.cover',
            ]);
    }
}
