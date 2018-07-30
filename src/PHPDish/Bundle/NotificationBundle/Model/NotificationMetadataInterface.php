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

use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationMetadataInterface
{
    /**
     * 获取参与者
     *
     * @return UserInterface
     */
    public function getParticipant();

    /**
     * 获取通知
     * @return NotificationInterface
     */
    public function getNotification();

    /**
     * @return boolean
     */
    public function isSeen();
}