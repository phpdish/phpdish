<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CategoryInterface extends TaxonomyInterface, EnabledInterface
{
    /**
     * 获取封面
     * @return string
     */
    public function getCover();

    /**
     * 创建封面图
     * @param int $width
     * @param int $height
     * @return string
     */
    public function buildCover($width, $height);

    /**
     * 设置创建人
     * @param UserInterface $creator
     * @return $this
     */
    public function setCreator(UserInterface $creator);

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
     * 添加一个作者
     * @param UserInterface $user
     * @return $this
     */
    public function addAuthor(UserInterface $user);

    /**
     * 获取作者
     * @return UserInterface[]|ArrayCollection
     */
    public function getAuthors();

    /**
     * 添加一篇文章
     * @param PostInterface $post
     * @return $this
     */
    public function addPost(PostInterface $post);

    /**
     * 获取所有文章
     * @return PostInterface[]|Collection
     */
    public function getPosts();

    /**
     * 是否推荐
     * @return boolean
     */
    public function isRecommended();
}