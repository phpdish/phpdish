<?php

namespace PHPDish\Bundle\PostBundle\Event;

use PHPDish\Bundle\PostBundle\Model\PostInterface;
use Symfony\Component\EventDispatcher\Event;

class PostEvent extends Event
{
    /**
     * @var PostInterface
     */
    protected $post;

    public function __construct(PostInterface $post)
    {
        $this->post = $post;
    }

    /**
     * Gets the post for the event.
     *
     * @return PostInterface
     */
    public function getPost()
    {
        return $this->post;
    }
}
