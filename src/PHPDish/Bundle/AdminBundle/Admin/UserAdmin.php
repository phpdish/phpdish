<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class UserAdmin extends AbstractAdmin
{
    public function configureFormFields(FormMapper $form)
    {
        $form->add('email', 'email', ['label'=>'邮箱'])
            ->add('username', 'text', ['label'=>'用户名'])
            ->add('enabled', null, ['label'=>'是否启用']);
    }

    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('email',null, ['label'=>'邮箱'])
            ->add('username', null, ['label'=>'用户名']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('username', 'text', ['label'=>'用户名'])
            ->add('email', 'email', ['label'=>'邮箱'])
            ->add('avatar', 'image', ['label'=>'头像'])
            ->add('lastLogin', 'datetime', ['label'=>'上次登录'])
            ->add('enabled', 'boolean', ['label'=>'是否启用', 'editable' => true])
            ->add('_action', null, [
                'actions' => [
                    'show' => [],
                ]
            ]);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show->add('email', 'email', ['label'=>'邮箱'])
            ->add('username', 'text', ['label'=>'用户名'])
            ->add('avatar', 'text', ['label'=>'头像'])
            ->add('enabled', null, ['label'=>'是否启用']);
    }


    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('delete');
    }

    public function toString($object)
    {
        return '用户';
    }
}