<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Knp\Menu\ItemInterface as MenuItemInterface;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class ThreadAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter
            ->add('name', null, ['label'=>'thread.filter.name']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name', null, ['label' => 'thread.name'])
            ->add('slug', null, ['label' => 'thread.slug'])
            ->add('cover', null, ['label' => 'thread.cover'])
            ->add('enabled', null, ['label' => 'thread.enabled', 'editable'=>true])
            ->add('description', null, ['label' => 'thread.description'])
            ->add('topicCount', null, ['label' => 'thread.topic_count'])
            ->add('followerCount', null, ['label' => 'thread.follower_count'])
            ->add('createdAt', null, ['label' => 'thread.created_at']);
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, ['label' => 'thread.name'])
            ->add('slug', null, ['label' => 'thread.slug'])
            ->add('cover', null, ['label' => 'thread.cover'])
            ->add('enabled', null, ['label' => 'thread.enabled'])
            ->add('description', null, ['label' => 'thread.description']);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show
            ->add('name', null, ['label' => 'thread.name'])
            ->add('slug', null, ['label' => 'thread.slug'])
            ->add('cover', null, ['label' => 'thread.cover'])
            ->add('enabled', null, ['label' => 'thread.enabled'])
            ->add('description', null, ['label' => 'thread.description']);
    }


    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;

        $id = $admin->getRequest()->get('id');

        $menu->addChild('thread.view_thread', [
            'uri' => $admin->generateUrl('show', ['id' => $id])
        ]);

        if ($this->isGranted('LIST')) {
            $menu->addChild('thread.manage_topics', [
                'uri' => $admin->generateUrl('phpdish.admin.topic.list', ['id' => $id])
            ]);
        }
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('delete');
        $collection->remove('edit');
    }
}