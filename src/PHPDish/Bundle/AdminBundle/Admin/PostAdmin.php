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
        $filter->add('user.email', null,  ['label'=>'filter.user_email'])
            ->add('user.username', null,  ['label'=>'filter.user_username'])
            ->add('title', null, ['label'=>'post.filter.title']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('title', 'url', [
                'label' => 'post.title',
                'attributes' => ['target' => '_blank'],
                'route'=> ['name' => 'post_view', 'identifier_parameter_name' => 'id']
            ])
            ->add('category', null, ['label'=>'post.category'])
            ->add('user', null, ['label'=>'post.user'])
            ->add('recommended', null, ['label'=>'post.recommended', 'editable'=>true])
            ->add('commentCount', null, ['label'=>'post.comment_count'])
            ->add('viewCount', null, ['label'=>'post.view_count'])
            ->add('createdAt', null, ['label'=>'post.created_at'])
            ->add('enabled', null, ['editable'=>true, 'label'=>'post.enabled']);
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