<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Comment\Model\Entity;

use Cake\ORM\Entity;
use PHPDish\Component\Comment\Entity\CommentableInterface;
use PHPDish\Component\Comment\Entity\CommentInterface;

class Comment extends Entity implements CommentInterface
{
    protected $_accessible =  [
        'id' => false,
        '*' => true
    ];

    public function getCreatedAt()
    {
        return $this->get('created_at');
    }

    public function setCreatedAt(\DateTime $time)
    {
        $this->set('created_at', $time);
    }

    public function getContent()
    {
        return $this->get('content');
    }

    public function getAuthor()
    {
        return $this->get('user');
    }

    public function getType()
    {
        return $this->get('type');
    }

    public function getCommentable()
    {

    }

    public function setCommentable(CommentableInterface $commentable)
    {
        $this->setType($commentable->getCommentType());
        $this->set('commentable', $commentable);
    }

    public function getStatus()
    {
        return $this->get('status');
    }

    public function getVoteCount()
    {
        return (int)$this->get('vote_count');
    }

    public function getVotes()
    {
    }
}