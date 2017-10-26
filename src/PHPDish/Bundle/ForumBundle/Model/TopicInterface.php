<?php
/**
 * PHPDish forum component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentableInterface;
use PHPDish\Bundle\CoreBundle\Model\ContentInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface TopicInterface extends IdentifiableInterface, DateTimeInterface, UserAwareInterface, CommentableInterface, EnabledInterface, ContentInterface, VotableInterface
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
     * @return ThreadInterface
     */
    public function getThread();

    /**
     * @param ThreadInterface $thread
     *
     * @return $this
     */
    public function setThread(ThreadInterface $thread);

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
     * @return UserInterface
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
     * 是否置顶.
     *
     * @return bool
     */
    public function isStickTop();

    /**
     * 设置置顶.
     *
     * @param bool $stickTop
     *
     * @return $this
     */
    public function setStickTop($stickTop);

    /**
     * 置顶话题.
     *
     * @return $this
     */
    public function stickTop();

    /**
     * 获取概述
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
}
