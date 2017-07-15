<?php
namespace PHPDish\Bundle\CoreBundle\Model;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

trait CommentableTrait
{
    /**
     * @ORM\Column(type="integer")
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
     * @param CommentInterface $comment
     * @return $this
     */
    public function addComment(CommentInterface $comment)
    {
        $this->getComments()->add($comment);
        return $this;
    }

    /**
     * Remove comment
     * @param CommentInterface $comment
     */
    public function removeComment(CommentInterface $comment)
    {
        $this->getComments()->removeElement($comment);
    }

    /**
     * Get comments
     * @return Collection
     */
    abstract public function getComments();
}
