<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CmsBundle\Model;

use PHPDish\Bundle\ResourceBundle\Model\DateTimeTrait;
use PHPDish\Bundle\ResourceBundle\Model\EnabledTrait;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

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