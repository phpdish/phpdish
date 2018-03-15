<?php

namespace PHPDish\Bundle\CoreBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

abstract class Comment implements CommentInterface
{
    use ContentTrait, DateTimeTrait, UserAwareTrait, EnabledTrait;
}