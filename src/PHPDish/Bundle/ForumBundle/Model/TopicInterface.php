<?php
/**
 * PHPDish forum component
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

interface TopicInterface extends
    IdentifiableInterface,
    DateTimeInterface,
    UserAwareInterface,
    CommentableInterface,
    EnabledInterface,
    ContentInterface,
    VotableInterface
{
//    public function getReplyCount();
//
//    public function setReplyCount();

    /**
     * 获取标题
     * @return string
     */
    public function getTitle();

    /**
     * 设置标题
     * @param string $title
     * @return $this
     */
    public function setTitle($title);

    /**
     * 获取所属thread
     * @return ThreadInterface
     */
    public function getThread();

    /**
     * @param ThreadInterface $thread
     * @return $this
     */
    public function setThread(ThreadInterface $thread);
}