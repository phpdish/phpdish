<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class UserAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('email',null, ['label'=>'user.email'])
            ->add('username', null, ['label'=>'user.username']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('username', 'text', ['label'=>'user.username'])
            ->add('email', 'email', ['label'=>'user.email'])
            ->add('avatar', 'image', ['label'=>'user.avatar'])
            ->add('lastLogin', 'datetime', ['label'=>'user.last_login'])
            ->add('enabled', 'boolean', ['label'=>'user.enabled', 'editable' => true])
            ->add('_action', null, [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                ]
            ]);
    }

    public function configureFormFields(FormMapper $form)
    {
        $form->add('email', 'email', ['label'=>'user.email'])
            ->add('username', 'text', ['label'=>'user.username'])
            ->add('roles', 'choice', [
                'label'=>'user.roles',
                'multiple' => true,
                'choices' => [
                    'User' => 'ROLE_USER',
                    'Admin' => 'ROLE_ADMIN',
                    'Super Admin' => 'ROLE_SUPER_ADMIN',
                ],
                'placeholder' => 'user.select_roles'
            ])
            ->add('enabled', null, ['label'=>'user.filter.enabled']);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show->add('email', 'email', ['label'=>'user.email'])
            ->add('username', 'text', ['label'=>'user.username'])
            ->add('avatar', 'text', ['label'=>'user.avatar'])
            ->add('enabled', null, ['label'=>'user.enabled']);
    }


    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
        $collection->remove('delete');
    }

    public function toString($object)
    {
        return 'user.user';
    }
}