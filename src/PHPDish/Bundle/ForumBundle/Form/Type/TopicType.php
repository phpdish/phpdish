<?php
namespace PHPDish\Bundle\ForumBundle\Form\Type;

use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class TopicType extends AbstractType
{
    /**
     * @var ThreadManagerInterface
     */
    protected $threadManager;

    public function __construct(ThreadManagerInterface $threadManager)
    {
        $this->threadManager = $threadManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('title', TextType::class, [
                'label' => '标题'
            ])
            ->add('thread', EntityType::class, [
                'label' => '所属分类',
                'class' => 'PHPDishForumBundle:Thread',
                'choices' => $this->threadManager->findEnabledThreads()
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => '内容'
            ]);
    }
}