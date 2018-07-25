<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */
declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Service;

use PHPDish\Bundle\CoreBundle\Model\FriendLink;

interface FriendLinkManagerInterface
{
    /**
     * 获取所有启用的友情链接
     *
     * @param int $limit
     * @return FriendLink[]
     */
    public function findEnabledFriendLinks($limit);

    /**
     * 保存友链
     *
     * @param FriendLink $friendLink
     */
    public function saveFriendLink(FriendLink $friendLink);
}