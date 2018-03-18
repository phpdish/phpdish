<?php

declare(strict_types=1);

namespace PHPDish\Bundle\PostBundle\Event;

use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;

class VotePostEvent extends Event
{
    /**
     * @var PostInterface
     */
    protected $post;

    /**
     * @var UserInterface
     */
    protected $voter;

    public function __construct(PostInterface $post, UserInterface $user)
    {
        $this->post = $post;
        $this->voter = $user;
    }

    /**
     * @return PostInterface
     */
    public function getPost(): PostInterface
    {
        return $this->post;
    }

    /**
     * @return UserInterface
     */
    public function getVoter(): UserInterface
    {
        return $this->voter;
    }
}