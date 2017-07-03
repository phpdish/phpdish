<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

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
     * 获取评论内容
     * @return string
     */
    public function getBody();

    /**
     * 设置内容
     * @param string $content
     * @return $this
     */
    public function setBody($content);

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
}