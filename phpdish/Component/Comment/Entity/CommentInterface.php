<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Comment\Entity;

use PHPDish\Component\User\UserInterface;
use PHPDish\Component\Vote\Entity\VotableInterface;

interface CommentInterface extends VotableInterface
{
    /**
     * 不予显示
     * @var int
     */
    const STATUS_BLOCKED = 0;

    /**
     * 正常有效的
     * @var int
     */
    const STATUS_VALID = 1;

    /**
     * 审核中
     * @var int
     */
    const STATUS_REVIEWING = 2;

    /**
     * 获取评论时间
     * @return string
     */
    public function getCreatedAt();

    /**
     * 设置评论时间
     * @param \DateTime $time
     * @return $this
     */
    public function setCreatedAt(\DateTime $time);

    /**
     * 获取评论类型
     * @return string
     */
    public function getType();

    /**
     * 设置评论类型
     * @return $this
     */
    public function setType();

    /**
     * 获取评论内容
     * @return string
     */
    public function getContent();

    /**
     * 设置内容
     * @param string $content
     * @return $this
     */
    public function setContent($content);

    /**
     * 获取评论状态
     * @return int
     */
    public function getStatus();

    /**
     * 设置评论状态
     * @param int $status
     * @return $this
     */
    public function setStatus($status);

    /**
     * 获取作者
     * @return UserInterface
     */
    public function getAuthor();

    /**
     * 获取被评论的资源
     * @return CommentableInterface
     */
    public function getCommentable();

    /**
     * 设置评论的资源
     * @param CommentableInterface $commentable
     * @return $this
     */
    public function setCommentable(CommentableInterface $commentable);
}