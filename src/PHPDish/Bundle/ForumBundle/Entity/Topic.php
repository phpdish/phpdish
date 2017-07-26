<?php
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\CoreBundle\Model\CommentableTrait;
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
     * @ORM\Column(type="string")
     */
    protected $title;

    /**
     * @ORM\OneToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @var UserInterface
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Thread")
     * @ORM\JoinColumn(name="thread_id", referencedColumnName="id")
     */
    protected $thread;

    /**
     * {@inheritdoc}
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * {@inheritdoc}
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }
    
    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * {@inheritdoc}
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * {@inheritdoc}
     */
    public function setThread(ThreadInterface $thread)
    {
        $this->thread = $thread;
    }
}

