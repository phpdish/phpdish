<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

trait Votable
{
    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $voteCount = 0;

    protected $votes;

    /**
     * Set voteCount
     *
     * @param integer $voteCount
     *
     * @return Post
     */
    public function setVoteCount($voteCount)
    {
        $this->voteCount = $voteCount;

        return $this;
    }

    /**
     * Get voteCount
     *
     * @return integer
     */
    public function getVoteCount()
    {
        return $this->voteCount;
    }

    /**
     * Add vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\PostVote $vote
     *
     * @return Post
     */
    public function addVote(\PHPDish\Bundle\PostBundle\Entity\PostVote $vote)
    {
        $this->votes[] = $vote;

        return $this;
    }

    /**
     * Remove vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\PostVote $vote
     */
    public function removeVote(\PHPDish\Bundle\PostBundle\Entity\PostVote $vote)
    {
        $this->votes->removeElement($vote);
    }

    /**
     * Get votes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getVotes()
    {
        return $this->votes;
    }
}