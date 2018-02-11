<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Route\RouteCollection;

class PaymentAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('user.email', null, [], 'email', ['label'=>'邮箱'])
            ->add('user.username', null)
            ->add('type')
            ->add('status');
    }

    public function configureDefaultFilterValues(array &$filterValues)
    {
//        $filterValues['type'] = [
//            'type'  => ChoiceType::TYPE_CONTAINS,
//            'value' => 'bar',
//        ];
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('user')
            ->add('amount', 'currency', [
                'currency' => 'CNY'
            ])
            ->add('type')
            ->add('status')
            ->add('description', 'html')
            ->add('createdAt')
            ->add('enabled');
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