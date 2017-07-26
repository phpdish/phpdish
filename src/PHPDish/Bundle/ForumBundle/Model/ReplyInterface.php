<?php
namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\VotableInterface;

interface ReplyInterface extends CommentInterface, VotableInterface
{

}