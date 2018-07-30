<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Model;

use PHPDish\Bundle\ResourceBundle\Model\DateTimeInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationInterface extends IdentifiableInterface, DateTimeInterface
{
    /**
     * 获取通知的接收人.
     *
     * @return UserInterface
     */
    public function getUser();

    /**
     * 获取主题.
     *
     * @return string
     */
    public function getSubject();

    /**
     * 获取消息内容
     *
     * @return string
     */
    public function getMessage();

    /**
     * 是否已经查看
     *
     * @return bool
     */
    public function isSeen();
}
