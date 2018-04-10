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

class CategoryAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter
            ->add('creator.username', null, ['label'=>'category.filter.username'])
            ->add('name', null, ['label'=>'category.filter.name']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('name', null, [
                'label' => 'category.name',
                /* 暂时没实现
                'attributes' => ['target' => '_blank'],
                'route'=> [
                    'name' => 'category_view',
                    'object_parameters' => [
                        'slug' => function($entity){
                            return $entity->getSlug();
                        }
                    ],
                    'identifier_parameter_name' => 'slug'
                ]*/
            ])
            ->add('slug', null, ['label' => 'category.slug'])
            ->add('creator', null, ['label' => 'category.creator'])
            ->add('cover', null, ['label' => 'category.cover'])
            ->add('recommended', null, ['label' => 'category.recommended', 'editable'=>true])
            ->add('enabled', null, ['label' => 'category.enabled', 'editable'=>true])
            ->add('description', null, ['label' => 'category.description'])
            ->add('postCount', null, ['label' => 'category.post_count'])
            ->add('followerCount', null, ['label' => 'category.follower_count'])
            ->add('createdAt', null, [
                'label' => 'category.created_at'
            ]);
    }

    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, ['label' => 'category.name'])
            ->add('slug', null, ['label' => 'category.slug'])
            ->add('creator', null, ['label' => 'category.creator'])
            ->add('managers', null, ['label' => 'category.managers'])
            ->add('cover', null, ['label' => 'category.cover'])
            ->add('recommended', null, ['label' => 'category.recommended'])
            ->add('enabled', null, ['label' => 'category.enabled'])
            ->add('description', null, ['label' => 'category.description']);
    }


    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;

        $id = $admin->getRequest()->get('id');

        if ($this->isGranted('LIST')) {
            $menu->addChild('category.manage_posts', [
                'uri' => $admin->generateUrl('phpdish.admin.post.list', ['id' => $id])
            ]);
        }
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('delete');
        $collection->remove('show');
        $collection->remove('create');
    }
}