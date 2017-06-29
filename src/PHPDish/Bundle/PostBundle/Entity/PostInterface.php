<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

interface PostInterface extends VotableInterface, CommentableInterface
{
    /**
     * 获取标题
     * @return string
     */
    public function getTitle();

    /**
     * 获取创建时间
     * @return string
     */
    public function getCreatedAt();

    /**
     * 获取修改时间
     * @return string
     */
    public function getUpdatedAt();

    /**
     * 获取查看次数
     * @return int
     */
    public function getViewCount();

    /**
     * 获取作者
     * @return UserInterface
     */
    public function getAuthor();
}