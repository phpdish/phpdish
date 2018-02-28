<?php

namespace PHPDish\Bundle\UserBundle\Menu;

use Knp\Menu\FactoryInterface;

final class SettingMenuBuilder
{
    /**
     * @var FactoryInterface
     */
    private $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
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
                'label' => '基本资料',
                'route' => 'setting_profile',
            ])
            ->setAttribute('class', 'list-group-item if i-envelope-o');

        $menu->addChild('Change Password', [
                'label' => '修改密码',
                'route' => 'setting_change_password',
            ])
            ->setAttribute('class', 'list-group-item if i-password');

        $menu->addChild('Social Binding', [
                'label' => '账户关联',
                'route' => 'setting_social_binding',
            ])
            ->setAttribute('class', 'list-group-item if i-sync');

        return $menu;
    }
}
