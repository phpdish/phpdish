<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use PHPDish\Bundle\PostBundle\Model\BookInterface;

class Book implements BookInterface
{
    /**
     * @var array
     */
    protected $summary;

    /**
     * @param array $summary
     */
    public function setSummary($summary)
    {
        $this->summary = $summary;
    }

    public function getSummary()
    {
        // TODO: Implement getSummary() method.
    }
}