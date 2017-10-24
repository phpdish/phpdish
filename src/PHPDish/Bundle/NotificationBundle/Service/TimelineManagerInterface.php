<?php
namespace PHPDish\Bundle\NotificationBundle\Service;

use PHPDish\Bundle\NotificationBundle\Model\ActionInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface TimelineManagerInterface
{
    /**
     * 获取用户的动态
     *
     * @param UserInterface $user
     * @param int $page
     * @param int $limit
     * @return ActionInterface[]
     */
    public function findUserActions(UserInterface $user, $page, $limit = null);
}