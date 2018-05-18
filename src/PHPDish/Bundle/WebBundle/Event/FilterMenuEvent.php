<?php

namespace PHPDish\Bundle\WebBundle\Event;

use Knp\Menu\MenuItem;
use Symfony\Component\EventDispatcher\Event;

class FilterMenuEvent extends Event
{
    /**
     * @var MenuItem
     */
    protected $menu;

    public function __construct(MenuItem $menu)
    {
        $this->menu = $menu;
    }

    /**
     * @return MenuItem
     */
    public function getMenu()
    {
        return $this->menu;
    }
}