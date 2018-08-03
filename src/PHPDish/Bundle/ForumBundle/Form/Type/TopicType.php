<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Bundle\ForumBundle\Form\Type;

use PHPDish\Bundle\ForumBundle\Form\DataTransformer\StringToThreadsTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class TopicType extends AbstractType
{
    /**
     * @var StringToThreadsTransformer
     */
    protected $stringToThreadTransformer;

    public function __construct(
        StringToThreadsTransformer $stringToThreadsTransformer
    ) {
        $this->stringToThreadTransformer = $stringToThreadsTransformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('title', TextType::class, [
                'label' => 'form.topic.title',
            ])
            ->add('threads', TextType::class, [
                'label' => 'form.topic.threads'
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => 'form.topic.body',
            ]);

        $builder->get('threads')->addModelTransformer($this->stringToThreadTransformer);
    }
}
