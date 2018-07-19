<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Forum\Model;

use Doctrine\Common\Collections\Collection;
use PHPDish\Component\Content\Model\CommentableInterface;
use PHPDish\Component\Content\Model\ContentInterface;
use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\Resource\Model\VotableInterface;
use PHPDish\Component\User\Model\UserAwareInterface;
use PHPDish\Component\User\Model\UserInterface;

interface TopicInterface extends
    IdentifiableInterface,
    DateTimeInterface,
    UserAwareInterface,
    CommentableInterface,
    EnabledInterface,
    ContentInterface,
    VotableInterface
{
    /**
     * 获取标题.
     *
     * @return string
     */
    public function getTitle();

    /**
     * 设置标题.
     *
     * @param string $title
     *
     * @return $this
     */
    public function setTitle($title);

    /**
     * 获取所属thread.
     *
     * @return ThreadInterface[]
     */
    public function getThreads();

    /**
     * @param ThreadInterface[] $threads
     *
     * @return $this
     */
    public function setThreads($threads);

    /**
     * 获取回复数量.
     *
     * @return int
     */
    public function getReplyCount();

    /**
     * 设置回复数量.
     *
     * @return $this
     */
    public function setReplyCount($replyCount);

    /**
     * 获取上次回复时间.
     *
     * @return \DateTime
     */
    public function getRepliedAt();

    /**
     * 设置上次回复时间.
     *
     * @param \DateTime $dateTime
     *
     * @return $this
     */
    public function setRepliedAt(\DateTime $dateTime);

    /**
     * 获取最后回复的用户.
     *
     * @return \PHPDish\Component\User\Model\UserInterface
     */
    public function getLastReplyUser();

    /**
     * 设置最后回复的用户.
     *
     * @param UserInterface $user
     *
     * @return $this
     */
    public function setLastReplyUser(UserInterface $user);

    /**
     * 是否推荐.
     *
     * @return bool
     */
    public function isRecommended();

    /**
     * 设置推荐.
     *
     * @param bool $recommended
     *
     * @return $this
     */
    public function setRecommended($recommended);

    /**
     * 推荐话题.
     *
     * @return $this
     */
    public function recommend();

    /**
     * 设置置顶.
     *
     * @param bool $isTop
     *
     * @return $this
     */
    public function setTop($isTop);

    /**
     * 置顶话题.
     *
     * @return $this
     */
    public function stickTop();

    /**
     * 是否是置顶话题
     *
     * @return boolean
     */
    public function isTop();

    /**
     * 获取概述.
     *
     * @return string
     */
    public function getSummary();

    /**
     * 检查话题是否是属于指定用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isBelongsTo(UserInterface $user);

    /**
     * 提取文章中的图片.
     *
     * @return array
     */
    public function getImages();

    /**
     * 获取回复
     *
     * @return ReplyInterface[]|Collection
     */
    public function getReplies();
}
