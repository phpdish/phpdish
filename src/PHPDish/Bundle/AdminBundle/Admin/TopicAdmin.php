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
            ->add('title', 'url', [
                'label' => '标题',
                'attributes' => ['target' => '_blank'],
                'route'=> ['name' => 'topic_view', 'identifier_parameter_name' => 'id']
            ])
            ->add('threads', null, ['label'=>'节点'])
            ->add('user', null, ['label'=>'创建人'])
            ->add('recommended', null, ['editable'=>true, 'label' => '是否推荐'])
            ->add('replyCount', null, ['label'=>'回复数量'])
            ->add('viewCount', null, ['label'=>'查看数量'])
            ->add('createdAt', null, ['label'=>'创建日期'])
            ->add('enabled', null, ['editable'=>true, 'label' => '是否删除']);
    }

    public function getParentAssociationMapping()
    {
        return 'threads';
    }

    public function toString($object)
    {
        return '话题';
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('show');
        $collection->remove('delete');
    }
}