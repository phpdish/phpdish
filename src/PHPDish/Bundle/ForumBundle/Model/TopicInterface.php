<?php
/**
 * PHPDish forum component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentableInterface;
use PHPDish\Bundle\CoreBundle\Model\ContentInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface TopicInterface extends
    IdentifiableInterface,
    DateTimeInterface,
    UserAwareInterface,
    CommentableInterface,
    EnabledInterface,
    ContentInterface,
    VotableInterface
{
//    public function getReplyCount();
//
//    public function setReplyCount();
}