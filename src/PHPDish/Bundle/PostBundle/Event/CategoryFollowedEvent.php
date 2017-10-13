<?php

namespace PHPDish\Bundle\PostBundle\Event;

use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class CategoryFollowedEvent extends Event
{
    /**
     * @var CategoryInterface
     */
    protected $category;

    /**
     * @var UserInterface
     */
    protected $follower;

    public function __construct(CategoryInterface $category, UserInterface $user)
    {
        $this->category = $category;
        $this->follower = $user;
    }

    /**
     * @return CategoryInterface
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param CategoryInterface $category
     *
     * @return CategoryFollowedEvent
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return UserInterface
     */
    public function getFollower()
    {
        return $this->follower;
    }

    /**
     * @param UserInterface $follower
     *
     * @return CategoryFollowedEvent
     */
    public function setFollower($follower)
    {
        $this->follower = $follower;

        return $this;
    }
}
