<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="post_comments")
 */
class PostComment extends Comment
{
    /**
     * @ORM\ManyToOne(targetEntity="Post", inversedBy="comments")
     */
    protected $post;

    /**
     * Set voteCount
     *
     * @param integer $voteCount
     *
     * @return PostComment
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
     * Set post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Post $post
     *
     * @return PostComment
     */
    public function setPost(\PHPDish\Bundle\PostBundle\Entity\Post $post = null)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * Get post
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\Post
     */
    public function getPost()
    {
        return $this->post;
    }
}
