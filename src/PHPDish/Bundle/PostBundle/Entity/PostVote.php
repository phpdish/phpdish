<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="post_votes")
 */
class PostVote extends Vote
{
    /**
     * @ORM\ManyToOne(targetEntity="Post", inversedBy="votes")
     * @ORM\JoinColumn(name="votable_id", referencedColumnName="id")
     */
    protected $post;

    /**
     * Set post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Post $post
     *
     * @return $this
     */
    public function setPost(\PHPDish\Bundle\PostBundle\Entity\Post $post = null)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * Get Post
     *
     * @return Post
     */
    public function getPost()
    {
        return $this->post;
    }
}
