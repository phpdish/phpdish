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
            ->add('name', null, ['label'=>'标题']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name', null, ['label'=>'标题'])
            ->add('url', null, ['label'=>'URL'])
            ->add('logo', null, ['label'=>'LOGO'])
            ->add('priority', null, ['editable'=>true]);
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, ['label'=>'标题'])
            ->add('url', null, ['label'=>'URL'])
            ->add('logo', null, ['label'=>'LOGO'])
            ->add('priority', null, ['label'=>'优先级']);
    }
}