<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Forum\Model;

use PHPDish\Component\Cms\Model\CommentInterface;
use PHPDish\Component\Cms\Model\VotableInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;

interface ReplyInterface extends IdentifiableInterface, CommentInterface, VotableInterface
{
    /**
     * 设置话题.
     *
     * @param TopicInterface $topic
     *
     * @return $this
     */
    public function setTopic(TopicInterface $topic);

    /**
     * 获取话题.
     *
     * @return TopicInterface
     */
    public function getTopic();
}
