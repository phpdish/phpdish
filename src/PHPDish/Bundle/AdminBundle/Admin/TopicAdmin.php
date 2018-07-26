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
        $filter->add('user.email',null, ['label'=>'filter.user_email'])
            ->add('user.username', null, ['label'=>'filter.user_username'])
            ->add('title', null, ['label'=>'topic.filter.title']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('title', 'url', [
                'label' => 'topic.title',
                'attributes' => ['target' => '_blank'],
                'route'=> ['name' => 'topic_view', 'identifier_parameter_name' => 'id']
            ])
            ->add('threads', null, ['label'=>'topic.threads'])
            ->add('user', null, ['label'=>'topic.user'])
            ->add('recommended', null, ['label' => 'topic.recommended', 'editable'=>true])
            ->add('commentCount', null, ['label'=>'topic.reply_count'])
            ->add('viewCount', null, ['label'=>'topic.view_count'])
            ->add('createdAt', null, ['label'=>'topic.created_at'])
            ->add('enabled', null, ['label' => 'topic.enabled', 'editable'=>true]);
    }

    public function getParentAssociationMapping()
    {
        return 'threads';
    }

    public function toString($object)
    {
        return 'topic.topic';
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('show');
        $collection->remove('delete');
        $collection->remove('create');
    }
}