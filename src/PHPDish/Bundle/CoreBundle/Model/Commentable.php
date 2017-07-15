<?php
namespace PHPDish\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

trait Commentable
{
    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $commentCount = 0;

    /**
     * Set commentCount
     * @param integer $commentCount
     * @return $this
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;
        return $this;
    }

    /**
     * Get commentCount
     * @return integer
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }


    /**
     * Add comment
     *
     * @param CommentInterface $comment
     * @return $this
     */
    public function addComment(CommentInterface $comment)
    {
        $this->comments[] = $comment;
        return $this;
    }

    /**
     * Remove comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\PostComment $comment
     */
    public function removeComment(\PHPDish\Bundle\PostBundle\Entity\PostComment $comment)
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
