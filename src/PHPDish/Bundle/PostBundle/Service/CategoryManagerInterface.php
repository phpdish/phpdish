<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\ORM\QueryBuilder;
use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Slince\YouzanPay\Api\QRCode;

interface CategoryManagerInterface
{
    /**
     * 获取所有开启的专栏.
     *
     * @return Pagerfanta
     */
    public function findAllEnabledCategories();

    /**
     * 根据slug获取专栏.
     *
     * @param string $slug
     *
     * @return CategoryInterface
     */
    public function findCategoryBySlug($slug);

    /**
     * 根据id获取专栏
     * @param int $id
     * @return CategoryInterface
     */
    public function findCategoryById($id);

    /**
     * 获取用户的专栏.
     *
     * @param UserInterface $user
     *
     * @return CategoryInterface[]
     */
    public function findUserCategories(UserInterface $user);

    /**
     * 获取用户的专栏数量.
     *
     * @param UserInterface $user
     *
     * @return int
     */
    public function getUserCategoriesNumber(UserInterface $user);

    /**
     * 添加管理员.
     *
     * @param CategoryInterface $category
     * @param UserInterface     $user
     *
     * @return bool
     */
    public function addManagerForCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 关注专栏.
     *
     * @param CategoryInterface $category
     * @param UserInterface     $user
     *
     * @return bool
     */
    public function followCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 取消关注专栏.
     *
     * @param CategoryInterface $category
     * @param UserInterface     $user
     *
     * @return bool
     */
    public function unFollowCategory(CategoryInterface $category, UserInterface $user);

    /**
     * 创建专栏.
     *
     * @param UserInterface $user
     *
     * @return CategoryInterface
     */
    public function createCategory(UserInterface $user);

    /**
     * 保存专栏.
     *
     * @param CategoryInterface $category
     *
     * @return bool
     */
    public function saveCategory(CategoryInterface $category);

    /**
     * 创建查询用户专栏的query builder
     * @param UserInterface $user
     * @return QueryBuilder
     */
    public function createGetUserCategoriesQueryBuilder(UserInterface $user);

    /**
     * 为专栏/电子书付费
     * @param CategoryInterface $category
     * @param UserInterface $user
     * @return QRCode
     */
    public function payForCategory(CategoryInterface $category, UserInterface $user);
}
