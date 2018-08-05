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

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationMetadataInterface;
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
     * @param UserInterface[] $participants
     * @param NotificationInterface $notification
     * @param boolean $send 是否发送
     */
    public function sendNotification($participants, NotificationInterface $notification, $send = false);

    /**
     * 发送所有的通知
     */
    public function flush();

    /**
     * 获取用户的通知
     *
     * @param UserInterface $participant
     * @param boolean|null $seen
     * @return NotificationInterface[]
     */
    public function findNotifications(UserInterface $participant, $seen = null);

    /**
     * 获取用户的通知
     *
     * @param UserInterface $participant
     * @param boolean|null $seen
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findNotificationsPager(UserInterface $participant, $seen, $page, $limit = null);

    /**
     * 获取notification metadata
     *
     * @param UserInterface $participant
     * @param boolean|null $seen
     * @return NotificationMetadataInterface[]
     */
    public function findNotificationMetadata(UserInterface $participant, $seen = null);

    /**
     * 获取notification metadata
     *
     * @param UserInterface $participant
     * @param boolean|null $seen
     * @param int $page
     * @param int|null $limit
     * @return Pagerfanta
     */
    public function findNotificationMetadataPager(UserInterface $participant, $seen, $page, $limit = null);

    /**
     * 设置为已读
     *
     * @param NotificationMetadataInterface[] $notificationMeta
     */
    public function markAsSeen($notificationMeta);

    /**
     * 全部设置为已读
     *
     * @param UserInterface $participant
     */
    public function markAllAsSeen(UserInterface $participant);

    /**
     * 获取消息数量
     *
     * @param UserInterface $participant
     * @param null|bool $seen
     * @return int
     */
    public function getNotificationCount(UserInterface $participant, $seen = null);
}