<?php
/**
 * PHPDish vote component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\CoreBundle\Entity;

use PHPDish\Bundle\UserBundle\Model\UserInterface;
use DateTime;

interface VoteInterface
{
    /**
     * 获取id
     * @return int
     */
    public function getId();

    /**
     * 设置作者
     * @param UserInterface $author
     * @return VoteInterface
     */
    public function setAuthor(UserInterface $author);

    /**
     * 获取赞的用户
     * @return UserInterface
     */
    public function getAuthor();

    /**
     * 设置创建时间
     * @param DateTime $createdAt
     * @return VoteInterface
     */
    public function setCreatedAt(DateTime $createdAt);

    /**
     * 获取创建时间
     * @return DateTime
     */
    public function getCreatedAt();
}