<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;

class TopicAdmin extends AbstractAdmin
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
            ->add('threads')
            ->add('user')
            ->add('recommended', null, ['editable'=>true])
            ->add('replyCount')
            ->add('viewCount')
            ->add('createdAt')
            ->add('enabled', null, ['editable'=>true]);
    }

    public function getParentAssociationMapping()
    {
        return 'threads';
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('show');
        $collection->remove('delete');
        $collection->remove('delete');
    }
}