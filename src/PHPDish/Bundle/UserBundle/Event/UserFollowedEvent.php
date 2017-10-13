<?php

namespace PHPDish\Bundle\UserBundle\Event;

use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class UserFollowedEvent extends Event
{
    /**
     * @var UserInterface
     */
    protected $user;

    /**
     * @var UserInterface
     */
    protected $follower;

    public function __construct(UserInterface $user, UserInterface $follower)
    {
        $this->user = $user;
        $this->follower = $follower;
    }

    /**
     * @return UserInterface
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param UserInterface $user
     *
     * @return UserFollowedEvent
     */
    public function setUser($user)
    {
        $this->user = $user;

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
     * @return UserFollowedEvent
     */
    public function setFollower($follower)
    {
        $this->follower = $follower;

        return $this;
    }
}
