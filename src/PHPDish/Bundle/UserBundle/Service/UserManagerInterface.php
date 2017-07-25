<?php
namespace PHPDish\Bundle\UserBundle\Service;

use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface UserManagerInterface
{
    /**
     * 根据用户名获取用户
     * @param string $username
     * @return UserInterface
     */
    public function findUserByName($username);

    /**
     * 根据邮箱获取用户
     * @param string  $email
     * @return UserInterface
     */
    public function findUserByEmail($email);

    /**
     * 获取最近注册的用户
     * @param int $limit
     * @return UserInterface[]
     */
    public function findLatestUsers($limit);
}