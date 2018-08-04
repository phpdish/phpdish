<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
    const USER_FOLLOWED = 'user.followed';

    /**
     * 设置菜单
     *
     * @var string
     */
    const SETTING_MENU_BUILT = 'setting_menu.built';
}
