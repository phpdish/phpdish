<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

interface BlogInterface
{
    /**
     * 获取专栏名
     * @return string
     */
    public function getName();

    /**
     * 获取url唯一标记
     * @return string
     */
    public function getSlug();

    /**
     * 获取专栏描述
     * @return string
     */
    public function getDescription();

    /**
     * 获取封面
     * @return string
     */
    public function getCover();

    /**
     * 获取创建人
     * @return UserInterface
     */
    public function getCreator();

    /**
     * 获取文章数量
     * @return int
     */
    public function getPostCount();

    /**
     * 获取订阅人数量
     * @return int
     */
    public function getSubscriberCount();

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
     * 获取作者
     * @return AuthorInterface[]
     */
    public function getAuthors();

    /**
     * 是否推荐
     * @return boolean
     */
    public function isRecommended();

    /**
     * 是否锁定
     * @return boolean
     */
    public function isBlocked();
}