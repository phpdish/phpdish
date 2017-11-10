<?php

namespace PHPDish\Bundle\PostBundle\Event;


use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use Symfony\Component\EventDispatcher\Event;

class CategoryEvent extends Event
{
    /**
     * @var CategoryInterface
     */
    protected $category;

    public function __construct(CategoryInterface $category)
    {
        $this->category = $category;
    }

    /**
     * 获取专栏
     * @return CategoryInterface
     */
    public function getCategory()
    {
        return $this->category;
    }
}