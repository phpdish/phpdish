<?php
namespace PHPDish\Bundle\PostBundle\Form\Type;

use PHPDish\Bundle\PostBundle\Entity\Comment;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('original_body', TextareaType::class, [
            'label' => '内容'
        ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Comment::class
        ]);
    }

    public function getBlockPrefix()
    {
        return 'comment';
    }

    public function getName()
    {
        return $this->getBlockPrefix();
    }
}