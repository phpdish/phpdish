<?php

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

abstract class AbstractComment implements CommentInterface
{
    use ContentTrait, DateTimeTrait, UserAwareTrait, EnabledTrait;
}
