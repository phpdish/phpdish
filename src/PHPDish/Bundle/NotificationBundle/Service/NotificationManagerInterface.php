<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Service;

use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface NotificationManagerInterface
{

    /**
     * 创建通知
     *
     * @param string $subject
     * @param string $message
     * @return NotificationInterface
     */
    public function createNotification($subject, $message = null);

    /**
     * 发送通知
     *
     * @param UserInterface[] $participant
     * @param NotificationInterface $notification
     * @param boolean $send 是否发送
     */
    public function sendNotification($participant, NotificationInterface $notification, $send = false);

    /**
     * 发送所有的通知
     */
    public function sendAll();

    /**
     * 设置为已读
     *
     * @param UserInterface $participant
     * @param NotificationInterface $notification
     */
    public function markAsSeen(UserInterface $participant, NotificationInterface $notification);

    /**
     * 全部设置为已读
     *
     * @param UserInterface $participant
     */
    public function markAllAsSeen(UserInterface $participant);
}