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
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="topics")
 */
class Topic implements TopicInterface
{
    use IdentifiableTrait, UserAwareTrait, ContentTrait, CommentableTrait, DateTimeTrait, EnabledTrait, VotableTrait;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    protected $title;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
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
     * @ORM\Column(type="datetime")
     */
    protected $repliedAt;

    /**
     * @ORM\Column(type="integer")
     */
    protected $replyCount = 0;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $recommended = 0;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $stickTop = 0;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="last_reply_user_id", referencedColumnName="id")
     */
    protected $lastReplyUser;

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

    /**
     * {@inheritdoc}
     */
    public function setLastReplyUser(UserInterface $user)
    {
        $this->lastReplyUser = $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getLastReplyUser()
    {
        return $this->lastReplyUser;
    }

    /**
     * {@inheritdoc}
     */
    public function getRepliedAt()
    {
        return $this->repliedAt;
    }


    /**
     * {@inheritdoc}
     */
    public function setRepliedAt(\DateTime $reliedAt)
    {
        $this->repliedAt = $reliedAt;
        return $this;
    }


    /**
     * {@inheritdoc}
     */
    public function getReplyCount()
    {
        return $this->replyCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setReplyCount($replyCount)
    {
        $this->replyCount = $replyCount;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function isRecommended()
    {
        return $this->recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function setRecommended($recommended)
    {
        $this->recommended = $recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function recommend()
    {
        $this->recommended = true;
    }

    /**
     * {@inheritdoc}
     */
    public function isStickTop()
    {
        return $this->stickTop;
    }

    /**
     * {@inheritdoc}
     */
    public function setStickTop($stickTop)
    {
        $this->stickTop = $stickTop;
    }

    /**
     * {@inheritdoc}
     */
    public function stickTop()
    {
        $this->stickTop = true;
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }
}

