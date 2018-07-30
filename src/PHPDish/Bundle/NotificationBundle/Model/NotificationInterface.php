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

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\ResourceBundle\Model\DateTimeInterface;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;

interface NotificationInterface extends IdentifiableInterface, DateTimeInterface
{
    /**
     * 获取主题.
     *
     * @return string
     */
    public function getSubject();

    /**
     * 设置主题
     *
     * @param string $subject
     * @return self
     */
    public function setSubject($subject);

    /**
     * 获取消息内容
     *
     * @return string
     */
    public function getMessage();

    /**
     * 设置message
     *
     * @param string $message
     * @return self
     */
    public function setMessage($message);

    /**
     * 获取链接
     *
     * @return string
     */
    public function getLink();


    /**
     * 设置链接
     *
     * @param string $link
     * @return self
     */
    public function setLink($link);

    /**
     * 获取metadata信息
     *
     * @return NotificationMetadataInterface[]|Collection
     */
    public function getMetadata();

    /**
     * 添加新的metadata
     *
     * @param NotificationMetadataInterface $metadata
     * @return self
     */
    public function addMetadata(NotificationMetadataInterface $metadata);
}
