<?php

namespace PHPDish\Bundle\ChatBundle\Model;


use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface ChatInterface extends IdentifiableInterface
{
    /**
     * 获取收信人
     * @return UserInterface
     */
    public function getRecipient();

    /**
     * 获取发信人
     * @return UserInterface
     */
    public function getSender();

    /**
     * 获取发信日期
     * @return \DateTime
     */
    public function getCreatedAt();

    /**
     * 获取阅读日期
     * @return \DateTime
     */
    public function getReadAt();

    /**
     * 是否已经被阅读
     * @return boolean
     */
    public function isRead();

    /**
     * 获取信息内容
     * @return string
     */
    public function getBody();
}