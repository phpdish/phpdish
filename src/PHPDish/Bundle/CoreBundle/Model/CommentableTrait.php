<?php

namespace PHPDish\Bundle\CoreBundle\Model;

trait CommentableTrait
{
    /**
     * @var int
     */
    protected $commentCount = 0;

    /**
     * Set commentCount.
     *
     * @param int $commentCount
     *
     * @return $this
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;

        return $this;
    }

    /**
     * Get commentCount.
     *
     * @return int
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }
}
