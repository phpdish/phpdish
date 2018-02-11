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
            ->add('title', 'url', [
                'label' => '标题',
                'attributes' => ['target' => '_blank'],
                'route'=> ['name' => 'post_view', 'identifier_parameter_name' => 'id']
            ])
            ->add('category', null, ['label'=>'专栏'])
            ->add('user', null, ['label'=>'作者'])
            ->add('recommended', null, ['editable'=>true])
            ->add('commentCount', null, ['label'=>'评论数量'])
            ->add('viewCount', null, ['label'=>'查看次数'])
            ->add('createdAt', null, ['label'=>'创建时间'])
            ->add('enabled', null, ['editable'=>true, 'label'=>'是否删除']);
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