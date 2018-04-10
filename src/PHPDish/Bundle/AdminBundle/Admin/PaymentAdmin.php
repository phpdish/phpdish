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
        $filter->add('user.email', null,  ['label'=>'filter.user_email'])
            ->add('user.username', null,  ['label'=>'filter.user_username'])
            ->add('type', null,  ['label'=>'payment.filter.type'])
            ->add('status', null,  ['label'=>'payment.filter.status']);
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('serialNo', null, ['label' => 'payment.serial_no'])
            ->addIdentifier('user', null, ['label' => 'payment.user'])
            ->add('price', 'currency', [
                'label' => 'payment.price',
                'template' => 'PHPDishAdminBundle:Common:list_field_money.html.twig'
            ])
            ->add('type', null, [
                'label' => 'payment.type',
                'template' => 'PHPDishAdminBundle:Payment:list_field_history_type.html.twig'
            ])
            ->add('status', null, [
                'label' => 'payment.status',
                'template' => 'PHPDishAdminBundle:Payment:list_field_history_status.html.twig'
            ])
            ->add('description', 'html', ['label' => 'payment.description'])
            ->add('createdAt', null, ['label' => 'payment.created_at'])
            ->add('enabled', null, ['label' => 'payment.enabled'])
            ->add('_action', null, [
                'label' => 'payment._action',
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
            ->add('serialNo', null, ['label' => 'payment.serial_no'])
            ->add('user', null, ['label' => 'payment.user'])
            ->add('amount', 'currency', [
                'label' => 'payment.amount',
                'currency' => 'CNY'
            ])
            ->add('type', null, ['label' => 'payment.type'])
            ->add('status', null, ['label' => 'payment.status'])
            ->add('description', 'html', ['label' => 'payment.description'])
            ->add('createdAt', null, ['label' => 'payment.created_at'])
            ->add('enabled', null, ['label' => 'payment.enabled']);
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