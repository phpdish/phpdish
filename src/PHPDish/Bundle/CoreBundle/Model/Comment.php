<?php
namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

class Comment implements CommentInterface
{
    use IdentifiableTrait, ContentTrait, DateTimeTrait, UserAwareTrait, EnabledTrait;
}