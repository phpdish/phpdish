<?php

namespace PHPDish\Bundle\WebBundle\Menu;

use Knp\Menu\FactoryInterface;

final class MainMenuBuilder
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
     * 创建主菜单.
     *
     * @param array $options
     *
     * @return \Knp\Menu\ItemInterface
     */
    public function createMenu(array $options = [])
    {
        $menu = $this->factory->createItem('root');

        $menu->setChildrenAttribute('class', 'nav navbar-nav');

        $menu->addChild('homepage', [
            'label' => '首页',
            'route' => 'homepage',
        ]);

        $menu->addChild('Category', [
            'label' => '专栏',
            'route' => 'post',
        ]);

        $menu->addChild('Topic', [
            'label' => '问答',
            'route' => 'thread_view',
            'routeParameters' => [
                'slug' => 'question',
            ],
        ]);

        $menu->addChild('job', [
            'label' => '招聘',
            'route' => 'thread_view',
            'routeParameters' => [
                'slug' => 'job',
            ],
        ]);

        $github = $menu->addChild('GitHub', [
            'label' => 'GitHub',
            'uri' => 'https://github.com/slince/phpdish'
        ]);
        $github->setLinkAttribute('target', '_blank');

        return $menu;
    }
}
