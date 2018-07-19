<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Component\Cms\Model;

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
