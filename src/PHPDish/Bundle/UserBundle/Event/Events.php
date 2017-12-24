<?php

namespace PHPDish\Bundle\UserBundle\Event;

final class Events
{
    /**
     * 用户被创建
     *
     * @var string
     */
    const USER_CREATED = 'user.created';

    /**
     * 用户被关注之后触发.
     *
     * @var string
     */
    const USER_FOLLOWEd = 'user.followed';
}
