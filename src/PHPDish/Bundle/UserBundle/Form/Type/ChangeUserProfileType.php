<?php

namespace PHPDish\Bundle\UserBundle\Form\Type;

use PHPDish\Bundle\CoreBundle\Locale\LocaleManager;
use PHPDish\Bundle\UserBundle\Model\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChangeUserProfileType extends AbstractType
{
    /**
     * @var LocaleManager
     */
    protected $localeManager;

    public function __construct(LocaleManager $localeManager)
    {
        $this->localeManager = $localeManager;
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $supportLocales = $this->localeManager->all();
        $builder
            ->add('username', TextType::class, [
                'label' => 'form.user.username',
            ])
            ->add('gender', ChoiceType::class, [
                'choices' => [
                     'form.user.gender.male' => User::GENDER_MEN,
                     'form.user.gender.female' => User::GENDER_WOMEN,
                ],
                'placeholder' => 'form.user.gender.placeholder',
                'label' => 'form.user.gender.gender',
            ])
            ->add('email', TextType::class, [
                'label' => 'form.user.email',
            ])
            ->add('description', TextareaType::class, [
                'label' => 'form.user.description',
            ])
            ->add('profile', ProfileType::class)
            ->add('avatar', HiddenType::class, [
                'label' => 'form.user.avatar',
            ])
            ->add('locale', ChoiceType::class, [
                'choices' => $this->wrapLocaleChoices(),
                'label' => 'form.user.locale.locale',
            ]);
    }

    /**
     * @return array
     */
    protected function wrapLocaleChoices()
    {
        $choices = [];
        foreach ($this->localeManager->all() as $locale) {
            $choices['form.user.locale.' . $locale] = $locale;
        }
        return $choices;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'validation_groups' => ['Profile']
        ]);
    }
}
