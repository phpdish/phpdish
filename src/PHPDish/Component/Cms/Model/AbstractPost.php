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

use PHPDish\Component\Cms\Utility\MarkdownHelper;
use PHPDish\Component\Resource\Model\DateTimeTrait;
use PHPDish\Component\Resource\Model\EnabledTrait;
use PHPDish\Component\User\Model\UserAwareTrait;
use PHPDish\Component\User\Model\UserInterface;

class AbstractPost implements PostInterface
{
    use UserAwareTrait, ContentTrait,
        CommentableTrait, DateTimeTrait, EnabledTrait, VotableTrait;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var int
     */
    protected $commentCount = 0;

    /**
     * @var int
     */
    protected $viewCount = 0;

    /**
     * 文章插图.
     * @var array
     */
    protected $images;

    /**
     * @var \DateTimeInterface
     */
    protected $lastCommentAt;

    /**
     * @var UserInterface
     */
    protected $lastCommentUser;

    /**
     * 评论
     * @var CommentInterface[]
     */
    protected $comments;

    public function __toString()
    {
        return $this->getTitle();
    }

    /**
     * {@inheritdoc}
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * {@inheritdoc}
     */
    public function setViewCount($viewCount)
    {
        $this->viewCount = $viewCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function addViewCount($viewCount)
    {
        $this->viewCount += $viewCount;
        $this->viewCount < 0 && $this->viewCount = 0;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getViewCount()
    {
        return $this->viewCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }

    /**
     * {@inheritdoc}
     */
    public function addCommentCount($count = 1)
    {
        $this->commentCount += $count;
    }

    /**
     * Gets the summary of the post.
     *
     * @return string
     */
    public function getSummary()
    {
        return strip_tags(mb_substr($this->body, 0, 250));
    }

    /**
     * {@inheritdoc}
     */
    public function getWordCount()
    {
        return mb_strlen($this->getBody(), 'UTF-8');
    }

    /**
     * 检查文章是否是属于指定用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getImages()
    {
        if (!is_null($this->images)) {
            return $this->images;
        }

        return $this->images = MarkdownHelper::extractImages($this->getOriginalBody());
    }

    /**
     * {@inheritdoc}
     */
    public function getLastCommentAt()
    {
        return $this->lastCommentAt;
    }

    /**
     * {@inheritdoc}
     */
    public function getLastCommentUser()
    {
        return $this->lastCommentUser;
    }

    /**
     * {@inheritdoc}
     */
    public function getComments()
    {
        return $this->comments;
    }
}