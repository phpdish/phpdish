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
     * 设置题图
     * @param string $cover
     * @return $this
     */
    public function setCover($cover);

    /**
     * 获取题图
     * @return string
     */
    public function getCover();

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

    /**
     * 获取评论数量
     * @return int
     */
    public function getCommentCount();

    /**
     * 设置评论数量
     * @param int $commentCount
     * @return $this
     */
    public function setCommentCount($commentCount);

    /**
     * 自增评论数量
     * @param int $count
     * @return $this
     */
    public function increaseCommentCount($count = 1);

    /**
     * 获取字数
     * @return int
     */
    public function getWordCount();

    /**
     * 获取分类
     * @return CategoryInterface
     */
    public function getCategory();

    /**
     * 设置分类
     * @param CategoryInterface $category
     * @return $this
     */
    public function setCategory(CategoryInterface $category);

    /**
     * 获取摘要
     * @return string
     */
    public function getSummary();
}