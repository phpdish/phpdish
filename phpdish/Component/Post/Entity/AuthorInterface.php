<?php
/**
 * PHPDish post component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Post\Entity;

use PHPDish\Component\User\UserInterface;

interface AuthorInterface
{
    /**
     * 获取作者所属专栏
     * @return BlogInterface
     */
    public function getBlog();

    /**
     * 获取作者信息
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取加入专栏时间
     * @return string
     */
    public function getJoinAt();
}