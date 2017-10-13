<?php

namespace PHPDish\Bundle\UserBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;

interface ProfileInterface extends IdentifiableInterface
{
    /**
     * 设置用户
     * @param UserInterface $user
     * @return ProfileInterface
     */
    public function setUser(UserInterface $user);

    /**
     * 获取用户
     * @return UserInterface
     */
    public function getUser();
}
