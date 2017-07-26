<?php
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\CoreBundle\Model\CommentableTrait;
use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="topics")
 */
class Topic implements TopicInterface
{
    use IdentifiableTrait, UserAwareTrait, ContentTrait, CommentableTrait, DateTimeTrait, EnabledTrait, VotableTrait;

    /**
     * @ORM\OneToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @var UserInterface
     */
    protected $user;

    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }
}
