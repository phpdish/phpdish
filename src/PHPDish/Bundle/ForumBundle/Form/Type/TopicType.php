<?php

namespace PHPDish\Bundle\ForumBundle\Form\Type;

use PHPDish\Bundle\ForumBundle\Form\DataTransformer\StringToThreadsTransformer;
use PHPDish\Bundle\ForumBundle\Form\DataTransformer\StringToThreadTransformer;
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
                'label' => '标题',
            ])
            ->add('threads', TextType::class, [
                'label' => '所属节点'
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => '内容',
            ]);

        $builder->get('threads')->addModelTransformer($this->stringToThreadTransformer);
    }
}
