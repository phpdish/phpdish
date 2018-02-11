<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\CoreBundle\Form\FormHelper;

class FriendLinkAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter
            ->add('name', null);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name')
            ->add('url')
            ->add('logo')
            ->add('priority', null, ['editable'=>true]);
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name')
            ->add('url')
            ->add('logo')
            ->add('priority', null);
    }
}