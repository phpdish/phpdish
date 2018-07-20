<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace  PHPDish\Component\Cms\Model;

use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\User\Model\UserAwareInterface;
use PHPDish\Component\User\Model\UserInterface;

interface CommentInterface extends ContentInterface, DateTimeInterface, UserAwareInterface, EnabledInterface
{
    /**
     * 是否属于某个用户.
     *
     * @param UserInterface $user
     */
    public function isBelongsTo(UserInterface $user);
}
