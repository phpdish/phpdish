<?php
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\CoreBundle\Model\Comment as BaseComment;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity
 * @ORM\Table(name="topic_replies")
 */
class Reply extends BaseComment implements ReplyInterface
{
    use VotableTrait;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @MaxDepth(1)
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Topic")
     * @MaxDepth(1)
     */
    protected $topic;

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
    public function setTopic(TopicInterface $topic)
    {
        $this->topic = $topic;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTopic()
    {
        return $this->topic;
    }
}