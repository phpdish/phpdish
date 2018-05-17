<?php

namespace PHPDish\Bundle\WebBundle\Menu;

use Knp\Menu\FactoryInterface;
use PHPDish\Bundle\WebBundle\Event\Events;
use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

final class MainMenuBuilder
{
    /**
     * @var FactoryInterface
     */
    private $factory;

    /**
     * @var EventDispatcherInterface $eventDispatcher
     */
    protected $eventDispatcher;

    public function __construct(
        FactoryInterface $factory,
        EventDispatcherInterface $eventDispatcher
    )
    {
        $this->factory = $factory;
        $this->eventDispatcher = $eventDispatcher;
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
            'label' => 'menu.homepage',
            'route' => 'homepage',
        ]);

        $menu->addChild('Category', [
            'label' => 'menu.category',
            'route' => 'post',
        ]);

        $menu->addChild('Topic', [
            'label' => 'menu.ask_question',
            'route' => 'thread_view',
            'routeParameters' => [
                'slug' => 'question',
            ],
        ]);

        $menu->addChild('job', [
            'label' => 'menu.job',
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

        $this->eventDispatcher->dispatch(Events::NAV_MENU_BUILT, new GenericEvent($menu));

        return $menu;
    }
}
