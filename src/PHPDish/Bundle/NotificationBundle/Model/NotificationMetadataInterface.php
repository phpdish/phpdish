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

use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationMetadataInterface extends IdentifiableInterface
{
    /**
     * 获取参与者
     *
     * @return UserInterface
     */
    public function getParticipant();

    /**
     * 设置参与者
     *
     * @param UserInterface $participant
     * @return self
     */
    public function setParticipant(UserInterface $participant);

    /**
     * 获取通知
     *
     * @return NotificationInterface
     */
    public function getNotification();

    /**
     * 设置通知
     *
     * @param NotificationInterface $notification
     * @return self
     */
    public function setNotification(NotificationInterface $notification);

    /**
     * @return boolean
     */
    public function isSeen();

    /**
     * 设置已读
     *
     * @param boolean $seen
     * @return self
     */
    public function setSeen($seen);
}