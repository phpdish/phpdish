<?php

namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\CoreBundle\Utility;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\CoreBundle\Model\CommentableTrait;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Algolia\AlgoliaSearchBundle\Mapping\Annotation as Algolia;

/**
 * @ORM\Entity
 * @ORM\Table(name="topics")
 */
class Topic implements TopicInterface
{
    use IdentifiableTrait, UserAwareTrait, ContentTrait, CommentableTrait, DateTimeTrait, EnabledTrait, VotableTrait;

    /**
     * @ORM\Column(type="string")
     * @Algolia\Attribute
     */
    protected $title;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *
     * @var UserInterface
     */
    protected $user;

    /**
     * @ORM\ManyToMany(targetEntity="Thread", cascade={"persist"})
     * @ORM\JoinTable(name="topics_threads",
     *      joinColumns={@ORM\JoinColumn(name="topic_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="thread_id", referencedColumnName="id")}
     * )
     */
    protected $threads;

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
    protected $recommended = false;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $isTop = false;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="last_reply_user_id", referencedColumnName="id")
     */
    protected $lastReplyUser;

    /**
     * 文章插图.
     *
     * @var array
     */
    protected $images;

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
    public function getThreads()
    {
        return $this->threads;
    }

    /**
     * {@inheritdoc}
     */
    public function setThreads($threads)
    {
        $this->threads = $threads;

        return $this;
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
    public function isTop()
    {
        return $this->isTop;
    }

    /**
     * {@inheritdoc}
     */
    public function setTop($isTop)
    {
        $this->isTop = $isTop;
    }


    /**
     * {@inheritdoc}
     */
    public function stickTop()
    {
        $this->isTop = true;
        return $this;
    }

    /**
     * Gets the summary of the topic.
     *
     * @return string
     * @Algolia\Attribute
     */
    public function getSummary()
    {
        return strip_tags(mb_substr($this->body, 0, 250));
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getImages()
    {
        if (!is_null($this->images)) {
            return $this->images;
        }

        return $this->images = Utility::extractImagesFromMarkdown($this->getOriginalBody());
    }
}
