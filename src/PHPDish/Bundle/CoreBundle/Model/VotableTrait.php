<?php

namespace PHPDish\Bundle\CoreBundle\Model;

use Doctrine\ORM\Mapping as ORM;

trait VotableTrait
{
    protected $voteCount = 0;

    /**
     * Set voteCount.
     *
     * @param int $voteCount
     *
     * @return $this
     */
    public function setVoteCount($voteCount)
    {
        $this->voteCount = $voteCount;

        return $this;
    }

    /**
     * Get voteCount.
     *
     * @return int
     */
    public function getVoteCount()
    {
        return $this->voteCount;
    }
}
