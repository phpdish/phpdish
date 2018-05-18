<?php

namespace PHPDish\Bundle\UserBundle\Menu;

use Knp\Menu\FactoryInterface;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\WebBundle\Event\FilterMenuEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

final class SettingMenuBuilder
{
    /**
     * @var FactoryInterface
     */
    private $factory;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    public function __construct(FactoryInterface $factory, EventDispatcherInterface $eventDispatcher)
    {
        $this->factory = $factory;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * 创建用户的左侧菜单.
     *
     * @param array $options
     *
     * @return \Knp\Menu\ItemInterface
     */
    public function createMenu(array $options = [])
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'list-group vertical-menu');

        $menu->addChild('Profile', [
                'label' => 'menu.profile',
                'route' => 'setting_profile',
            ])
            ->setAttribute('class', 'list-group-item if i-envelope-o');

        $menu->addChild('Change Password', [
                'label' => 'menu.change_password',
                'route' => 'setting_change_password',
            ])
            ->setAttribute('class', 'list-group-item if i-password');

        $menu->addChild('Social Binding', [
                'label' => 'menu.social_binding',
                'route' => 'setting_social_binding',
            ])
            ->setAttribute('class', 'list-group-item if i-sync');

        //触发事件
        $this->eventDispatcher->dispatch(Events::SETTING_MENU_BUILT, new FilterMenuEvent($menu));
        return $menu;
    }
}
