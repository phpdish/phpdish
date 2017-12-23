<?php

namespace PHPDish\Bundle\ChatBundle\Menu;

use Knp\Menu\FactoryInterface;

class NotificationMenuBuilder
{
    /**
     * @var FactoryInterface
     */
    protected $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createMenu(array $options = [])
    {
        $menu = $this->factory->createItem('root');

        $menu->setChildrenAttribute('class', 'list-group vertical-menu');

        $chat = $menu->addChild('提醒')
            ->setAttribute('class', 'list-group-item if i-envelope-o')
            ->setAttribute('data-action', 'collapse')
            ->setChildrenAttribute('class', 'sub-menu');

        $chat->addChild('收件箱', [
            'route' => 'chat_inbox',
        ]);
        $chat->addChild('已发送', [
            'route' => 'chat_sent',
        ]);

        $menu->addChild('通知', ['route' => 'notifications'])
            ->setAttribute('class', 'list-group-item if i-bell-o');

        return $menu;
    }
}
