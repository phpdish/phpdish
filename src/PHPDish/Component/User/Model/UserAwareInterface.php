<?php

namespace PHPDish\Component\User\Model;

interface UserAwareInterface
{
    /**
     * 设置用户.
     *
     * @param UserInterface $user
     *
     * @return $this
     */
    public function setUser(UserInterface $user);

    /**
     * 获取用户.
     *
     * @return UserInterface
     */
    public function getUser();
}
