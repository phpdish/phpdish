<?php

namespace PHPDish\Bundle\PostBundle\Event;

class CategoryCreateEvent extends CategoryEvent
{
    /**
     * @var bool
     */
    private $abortCreation = false;

    /**
     * Indicates that the persisting operation should not proceed.
     */
    public function abortCreation()
    {
        $this->abortCreation = true;
    }

    /**
     * Checks if a listener has set the event to abort the creation
     * operation.
     *
     * @return bool
     */
    public function isCreationAborted()
    {
        return $this->abortCreation;
    }
}