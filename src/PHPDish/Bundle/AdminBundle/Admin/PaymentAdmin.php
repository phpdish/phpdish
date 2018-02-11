<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class PaymentAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('user.email', null, [], 'email', ['label'=>'邮箱'])
            ->add('user.username', null)
            ->add('type')
            ->add('status');
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('serialNo', null, ['label' => '流水号'])
            ->addIdentifier('user', null, ['label' => '用户'])
            ->add('amount', 'currency', [
                'currency' => 'CNY'
            ])
            ->add('type', null, ['label' => '类型'])
            ->add('status', null, ['label' => '状态'])
            ->add('description', 'html', ['label' => '描述'])
            ->add('createdAt', null, ['label' => '创建时间'])
            ->add('enabled', null, ['label' => '是否有效']);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show
            ->add('serialNo', null, ['label' => '流水号'])
            ->add('user', null, ['label' => '用户'])
            ->add('amount', 'currency', [
                'currency' => 'CNY'
            ])
            ->add('type', null, ['label' => '类型'])
            ->add('status', null, ['label' => '状态'])
            ->add('description', 'html', ['label' => '描述'])
            ->add('createdAt', null, ['label' => '创建时间'])
            ->add('enabled', null, ['label' => '是否有效']);
    }

    public function getParentAssociationMapping()
    {
        return 'wallet';
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('delete');
    }
}