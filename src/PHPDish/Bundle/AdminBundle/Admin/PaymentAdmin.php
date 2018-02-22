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
        $filter->add('user.email', null,  ['label'=>'邮箱'])
            ->add('user.username', null,  ['label'=>'用户名'])
            ->add('type', null,  ['label'=>'类型'])
            ->add('status', null,  ['label'=>'状态']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('serialNo', null, ['label' => '流水号'])
            ->addIdentifier('user', null, ['label' => '用户'])
            ->add('price', 'currency', [
                'label' => '交易金额',
                'template' => 'PHPDishAdminBundle:Common:list_field_money.html.twig'
            ])
            ->add('type', null, [
                'label' => '类型',
                'template' => 'PHPDishAdminBundle:Payment:list_field_history_type.html.twig'
            ])
            ->add('status', null, [
                'label' => '状态',
                'template' => 'PHPDishAdminBundle:Payment:list_field_history_status.html.twig'
            ])
            ->add('description', 'html', ['label' => '描述'])
            ->add('createdAt', null, ['label' => '创建时间'])
            ->add('enabled', null, ['label' => '是否有效'])
            ->add('_action', null, [
                'label' => '操作',
                'actions' => [
                    'withdraw' => [
                        'template' => 'PHPDishAdminBundle:Payment:list__action_withdraw.html.twig'
                    ]
                ]
            ]);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show
            ->add('serialNo', null, ['label' => '流水号'])
            ->add('user', null, ['label' => '用户'])
            ->add('amount', 'currency', [
                'label' => '交易金额',
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
        $collection->add('withdraw', $this->getRouterIdParameter().'/withdraw');
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('delete');
    }
}