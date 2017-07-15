<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\ContentInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;
use PHPDish\Bundle\CoreBundle\Model\CommentableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface PostInterface extends
    IdentifiableInterface,
    ContentInterface,
    DateTimeInterface,
    UserAwareInterface,
    CommentableInterface,
    VotableInterface,
    EnabledInterface
{
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
     * 获取查看次数
     * @return int
     */
    public function getViewCount();

    /**
     * 设置查看次数
     * @param int $viewCount
     * @return $this
     */
    public function setViewCount($viewCount);
}