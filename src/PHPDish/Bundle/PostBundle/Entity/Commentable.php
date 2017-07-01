<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="commentable")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="comment_type", type="string")
 * @ORM\DiscriminatorMap({"post"="Post", "question"="Question"})
 */
abstract class Commentable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $commentCount;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="commentable")
     */
    protected $comments;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->comments = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set commentCount
     *
     * @param integer $commentCount
     *
     * @return Commentable
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;

        return $this;
    }

    /**
     * Get commentCount
     *
     * @return integer
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }

    /**
     * Add comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Comment $comment
     *
     * @return Commentable
     */
    public function addComment(\PHPDish\Bundle\PostBundle\Entity\Comment $comment)
    {
        $this->comments[] = $comment;

        return $this;
    }

    /**
     * Remove comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Comment $comment
     */
    public function removeComment(\PHPDish\Bundle\PostBundle\Entity\Comment $comment)
    {
        $this->comments->removeElement($comment);
    }

    /**
     * Get comments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getComments()
    {
        return $this->comments;
    }
}
