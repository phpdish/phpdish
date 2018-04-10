<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class FriendLinkAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter
            ->add('name', null, ['label'=>'friend_link.filter.name']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name', null, ['label'=>'friend_link.name'])
            ->add('url', null, ['label'=>'friend_link.url'])
            ->add('logo', null, ['label'=>'friend_link.logo'])
            ->add('priority', null, ['label'=>'friend_link.priority', 'editable'=>true]);
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, ['label'=>'friend_link.name'])
            ->add('url', null, ['label'=>'friend_link.url'])
            ->add('logo', null, ['label'=>'friend_link.logo'])
            ->add('priority', null, ['label'=>'friend_link.priority']);
    }
}