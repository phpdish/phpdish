<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace  PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\Comment as BaseComment;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use JMS\Serializer\Annotation as JMS;

/**
 * @ORM\Entity(repositoryClass="PHPDish\Bundle\PostBundle\Repository\CommentRepository")
 * @ORM\Table(name="comments")
 */
class Comment extends BaseComment implements CommentInterface
{
    use VotableTrait;

    /**
     * @ORM\ManyToOne(targetEntity="Post")
     * @ORM\JoinColumn(name="post_id", referencedColumnName="id")
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $post;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @JMS\MaxDepth(1)
     * @JMS\Groups({"details"})
     */
    protected $user;

    /**
     * {@inheritdoc}
     */
    public function setPost(PostInterface $post)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPost()
    {
        return $this->post;
    }

    /**
     * {@inheritdoc}
     */
    public function getUser()
    {
        return $this->user;
    }
}
