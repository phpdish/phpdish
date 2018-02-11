<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;

class PostAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('user.email', null, [], 'email', ['label'=>'邮箱'])
            ->add('user.username', null)
            ->add('title', null);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('title')
            ->add('category')
            ->add('user')
            ->add('recommended', null, ['editable'=>true])
            ->add('commentCount')
            ->add('viewCount')
            ->add('createdAt')
            ->add('enabled', null, ['editable'=>true]);
    }

    public function getParentAssociationMapping()
    {
        return 'category';
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('delete');
    }
}