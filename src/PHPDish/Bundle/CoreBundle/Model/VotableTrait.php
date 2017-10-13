<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

trait VotableTrait
{
    /**
     * @ORM\Column(type="integer")
     */
    protected $voteCount = 0;

//    /**
//     * @var ArrayCollection
//     */
//    protected $votes;

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

//    /**
//     * 添加投票记录
//     * @param VoteInterface $vote
//     * @return $this
//     */
//    public function addVote(VoteInterface $vote)
//    {
//        $this->votes[] = $vote;
//        return $this;
//    }
//
//    /**
//     * Remove vote
//     * @param VoteInterface
//     */
//    public function removeVote(VoteInterface $vote)
//    {
//        $this->votes->removeElement($vote);
//    }
//
//    /**
//     * Get votes
//     * @return VoteInterface[]|ArrayCollection
//     */
//    public function getVotes()
//    {
//        return $this->votes;
//    }
}
