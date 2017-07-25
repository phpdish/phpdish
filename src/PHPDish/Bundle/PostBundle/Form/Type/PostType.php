<?php
namespace PHPDish\Bundle\PostBundle\Form\Type;

use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class PostType extends AbstractType
{
    /**
     * @var CategoryManagerInterface
     */
    protected $categoryManager;

    public function __construct(CategoryManagerInterface $categoryManager)
    {
        $this->categoryManager = $categoryManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => '标题'
            ])
            ->add('category', EntityType::class, [
                'class' => 'PHPDishPostBundle:Category',
                'choice_label' => 'name',
                'choices' => $this->categoryManager->findAllEnabledCategories()
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => '内容'
            ]);
    }
}