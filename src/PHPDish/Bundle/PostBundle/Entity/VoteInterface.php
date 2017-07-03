<?php
/**
 * PHPDish vote component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

interface VoteInterface
{
    /**
     * 获取赞的用户
     * @return UserInterface
     */
    public function getAuthor();

    /**
     * 获取赞的时间
     * @return string
     */
    public function getCreatedAt();
}