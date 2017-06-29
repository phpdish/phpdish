<?php
/**
 * PHPDish vote component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Vote\Entity;

use PHPDish\Component\User\UserInterface;

interface VoteInterface
{
    /**
     * 获取被赞的对象
     * @return VotableInterface
     */
    public function getVotable();

    /**
     * 获取赞的类型
     * @return string
     */
    public function getType();

    /**
     * 获取赞的用户
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取赞的时间
     * @return string
     */
    public function getCreatedAt();
}