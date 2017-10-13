<?php

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

abstract class Comment implements CommentInterface
{
    use IdentifiableTrait, ContentTrait, DateTimeTrait, UserAwareTrait, EnabledTrait;
}
