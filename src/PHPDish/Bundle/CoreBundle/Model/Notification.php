<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\NotificationBundle\Model\Notification as BaseNotification;

class Notification extends BaseNotification
{
    const SUBJECT_FOLLOW_USER = 'follow_user';
    const SUBJECT_FOLLOW_CATEGORY = 'follow_category';
    const SUBJECT_REPLY_TOPIC = 'reply_topic';
    const SUBJECT_VOTE_TOPIC = 'vote_topic';
    const SUBJECT_VOTE_REPLY= 'vote_reply';
    const SUBJECT_COMMENT_POST = 'comment_post';
    const SUBJECT_MENTION_USER_IN_TOPIC = 'mention_user_in_topic';
    const SUBJECT_MENTION_USER_IN_POST = 'mention_user_in_post';
    const SUBJECT_VOTE_POST = 'vote_post';
    const SUBJECT_VOTE_COMMENT = 'vote_comment';
    const SUBJECT_HANDLE_WITHDRAW = 'handle_withdraw';

    /**
     * @var array
     */
    protected $parameters;

    /**
     * @return array
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * @param array $parameters
     * @return self
     */
    public function setParameters(array $parameters)
    {
        $this->parameters = $parameters;

        return $this;
    }

    /**
     * 设置参数
     *
     * @param string $name
     * @param mixed $value
     * @return self
     */
    public function setParameter($name, $value)
    {
        $this->parameters[$name] = $value;
        return $this;
    }

    /**
     * 获取参数
     *
     * @param string $name
     * @return mixed|null
     */
    public function getParameter($name)
    {
        return $this->parameters[$name] ?? null;
    }

    /**
     * 设置参数
     *
     * @param array $parameters
     * @return self
     */
    public function addParameters(array $parameters)
    {
        $this->parameters = array_merge($this->parameters, $parameters);
        return $this;
    }
}