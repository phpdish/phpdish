<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CategoryManagerInterface
{
    /**
     * 获取所有开启的专栏
     * @return Pagerfanta
     */
    public function findAllEnabledCategories();

    /**
     * 根据slug获取专栏
     * @param string $slug
     * @return CategoryInterface
     */
    public function findCategoryBySlug($slug);

    /**
     * 获取用户的专栏
     * @param UserInterface $user
     * @return CategoryInterface[]
     */
    public function findUserCategories(UserInterface $user);

    /**
     * 获取用户的专栏数量
     * @param UserInterface $user
     * @return int
     */
    public function getUserCategoriesNumber(UserInterface $user);

    /**
     * 添加管理员
     * @param CategoryInterface $category
     * @param UserInterface $user
     * @return boolean
     */
    public function addManagerForCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 关注专栏
     * @param CategoryInterface $category
     * @param UserInterface $user
     * @return boolean
     */
    public function followCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 取消关注专栏
     * @param CategoryInterface $category
     * @param UserInterface $user
     * @return boolean
     */
    public function unFollowCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 创建专栏
     * @param UserInterface $user
     * @return CategoryInterface
     */
    public function createCategory(UserInterface $user);

    /**
     * 保存专栏
     * @param CategoryInterface $category
     * @return boolean
     */
    public function saveCategory(CategoryInterface $category);
}