<?php

namespace PHPDish\Bundle\NotificationBundle\Model;


use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationInterface extends IdentifiableInterface
{
    /**
     * 获取通知的接收人
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取创建人
     * @return UserInterface
     */
    public function getFromUser();

    /**
     * 获取主题
     * @return string
     */
    public function getSubject();
}