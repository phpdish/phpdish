<?php

namespace PHPDish\Bundle\AdminBundle\Admin;

use Knp\Menu\ItemInterface as MenuItemInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;

class WalletAdmin extends AbstractAdmin
{
    protected $searchResultActions = ['edit', 'show'];

    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('user.email', null, [], 'email', ['label'=>'filter.user_email'])
            ->add('user.username')
            ->add('amount')
            ->add('freezeAmount');
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->addIdentifier('id')
            ->add('user', null, ['label'=>'wallet.user'])
            ->add('amount', null, ['label'=>'wallet.amount'])
            ->add('freezeAmount', null, ['label'=>'wallet.freeze_amount'])
            ->add('createdAt', null, ['label'=>'wallet.created_at']);
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show
            ->add('user', null, ['label'=>'wallet.user'])
            ->add('amount', null, ['label'=>'wallet.amount'])
            ->add('freezeAmount', null, ['label'=>'wallet.freeze_amount'])
            ->add('createdAt', null, ['label'=>'wallet.created_at']);
    }

    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;

        $id = $admin->getRequest()->get('id');

        $menu->addChild('wallet.view_wallet', [
            'uri' => $admin->generateUrl('show', ['id' => $id])
        ]);

        if ($this->isGranted('LIST')) {
            $menu->addChild('wallet.manage_payments', [
                'uri' => $admin->generateUrl('phpdish.admin.payment.list', ['id' => $id])
            ]);
        }
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
        $collection->remove('create');
        $collection->remove('delete');
    }
}