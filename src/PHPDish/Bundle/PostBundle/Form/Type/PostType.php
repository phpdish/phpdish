<?php

namespace PHPDish\Bundle\PostBundle\Form\Type;

use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

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

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('user');
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'form.post.title',
            ])
            ->add('category', EntityType::class, [
                'class' => 'PHPDishPostBundle:Category',
                'choice_label' => 'name',
                'choices' => $this->getCurrentUserCategories($options),
            ])
            ->add('originalBody', TextareaType::class, [
                'label' => 'form.post.body',
            ]);
    }

    /**
     * 获取当前用户的专栏.
     *
     * @return \PHPDish\Bundle\PostBundle\Model\CategoryInterface[]
     */
    protected function getCurrentUserCategories($options)
    {
        if (!isset($options['user'])) {
            throw new \InvalidArgumentException('You musts provide the option "user"');
        }

        return $this->categoryManager->findUserCategories($options['user']);
    }
}
