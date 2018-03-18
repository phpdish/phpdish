<?php

namespace PHPDish\Bundle\NotificationBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\CommentInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\NotificationBundle\Model\ActionInterface;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Notification implements NotificationInterface, ActionInterface
{
    use IdentifiableTrait;

    const SUBJECT_FOLLOW_USER = 'follow_user';

    const SUBJECT_FOLLOW_CATEGORY = 'follow_category';

    const SUBJECT_REPLY_TOPIC = 'reply_topic';

    const SUBJECT_VOTE_TOPIC = 'vote_topic';

    const SUBJECT_VOTE_REPLY= 'vote_reply';

    const SUBJECT_COMMENT_POST = 'comment_post';

    const SUBJECT_MENTION_USER_IN_TOPIC = 'mention_user_in_topic';

    const SUBJECT_MENTION_USER_IN_POST = 'mention_user_in_post';

    const SUBJECT_VOTE_POST = 'vote_post';

    const SUBJECT_VOTE_COMMENT = 'vote_comment';

    const SUBJECT_HANDLE_WITHDRAW = 'handle_withdraw';

    /**
     * @var string
     */
    protected $subject;

    /**
     * @var string
     */
    protected $message;

    /**
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @var bool
     */
    protected $seen = false;

    /**
     * @var UserInterface
     */
    protected $user;

    /**
     * @var UserInterface
     */
    protected $fromUser;

    /**
     * @var TopicInterface
     */
    protected $topic;

    /**
     * @var ReplyInterface
     */
    protected $reply;

    /**
     * @var PostInterface
     */
    protected $post;

    /**
     * @var CommentInterface
     */
    protected $comment;

    /**
     * @var CategoryInterface
     */
    protected $category;

    /**
     * @var PaymentInterface
     */
    protected $payment;

    /**
     * {@inheritdoc}
     */
    public function isSystem()
    {
        return in_array($this->subject, [static::SUBJECT_HANDLE_WITHDRAW]);
    }

    /**
     * @return UserInterface
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param UserInterface $user
     *
     * @return Notification
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return string
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * @param string $subject
     *
     * @return Notification
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;

        return $this;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     *
     * @return Notification
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     *
     * @return Notification
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return bool
     */
    public function isSeen()
    {
        return $this->seen;
    }

    /**
     * @param bool $seen
     *
     * @return Notification
     */
    public function setSeen($seen)
    {
        $this->seen = $seen;

        return $this;
    }

    /**
     * @return UserInterface
     */
    public function getFromUser()
    {
        return $this->fromUser;
    }

    /**
     * @param UserInterface $fromUser
     *
     * @return Notification
     */
    public function setFromUser($fromUser)
    {
        $this->fromUser = $fromUser;

        return $this;
    }

    /**
     * @return TopicInterface
     */
    public function getTopic()
    {
        return $this->topic;
    }

    /**
     * @param TopicInterface $topic
     *
     * @return Notification
     */
    public function setTopic($topic)
    {
        $this->topic = $topic;

        return $this;
    }

    /**
     * @return ReplyInterface
     */
    public function getReply()
    {
        return $this->reply;
    }

    /**
     * @param ReplyInterface $reply
     *
     * @return Notification
     */
    public function setReply($reply)
    {
        $this->reply = $reply;

        return $this;
    }

    /**
     * @return PostInterface
     */
    public function getPost()
    {
        return $this->post;
    }

    /**
     * @param PostInterface $post
     *
     * @return Notification
     */
    public function setPost($post)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * @return CommentInterface
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * @param CommentInterface $comment
     *
     * @return Notification
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * @return CategoryInterface
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param CategoryInterface $category
     *
     * @return Notification
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return PaymentInterface
     */
    public function getPayment()
    {
        return $this->payment;
    }

    /**
     * @param PaymentInterface $payment
     * @return Notification
     */
    public function setPayment($payment)
    {
        $this->payment = $payment;

        return $this;
    }
}
