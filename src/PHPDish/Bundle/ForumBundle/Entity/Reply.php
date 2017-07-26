<?php
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\CoreBundle\Model\Comment as BaseComment;

/**
 * @ORM\Entity
 * @ORM\Table(name="topic_replies")
 */
class Reply extends BaseComment implements ReplyInterface
{
    use VotableTrait;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Topic")
     */
    protected $topic;

    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }
}