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
            ->add('name');
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name', null, ['label' => '名称'])
            ->add('slug', null, ['label' => 'slug'])
            ->add('cover', null, ['label' => '封面'])
            ->add('enabled', null, ['label' => '是否删除', 'editable'=>true])
            ->add('description', null, ['label' => '专栏描述'])
            ->add('topicCount', null, ['label' => '文章数量'])
            ->add('followerCount', null, ['label' => '订阅数量'])
            ->add('createdAt');
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, ['label' => '名称'])
            ->add('slug', null, ['label' => 'slug'])
            ->add('cover', null, ['label' => '封面'])
            ->add('enabled', null, ['label' => '是否删除'])
            ->add('description', null, ['label' => '专栏描述']);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show
            ->add('name', null, ['label' => '名称'])
            ->add('slug', null, ['label' => 'slug'])
            ->add('cover', null, ['label' => '封面'])
            ->add('enabled', null, ['label' => '是否删除'])
            ->add('description', null, ['label' => '专栏描述']);
    }


    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;

        $id = $admin->getRequest()->get('id');

        $menu->addChild('查看话题', [
            'uri' => $admin->generateUrl('show', ['id' => $id])
        ]);

        if ($this->isGranted('LIST')) {
            $menu->addChild('管理话题', [
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