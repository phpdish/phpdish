<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

class Votable
{
    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $voteCount;

    /**
     * @ORM\OneToMany(targetEntity="Vote", mappedBy="votable")
     */
    protected $votes;

    /**
     * Set voteCount
     *
     * @param integer $voteCount
     *
     * @return Comment
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
}