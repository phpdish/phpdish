<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Cms\Model;

use PHPDish\Component\Resource\Model\DateTimeTrait;
use PHPDish\Component\Resource\Model\EnabledTrait;
use PHPDish\Component\User\Model\UserAwareTrait;
use PHPDish\Component\User\Model\UserInterface;

abstract class AbstractComment implements CommentInterface
{
    use ContentTrait, DateTimeTrait, UserAwareTrait, EnabledTrait;

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }
}