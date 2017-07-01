<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="comments")
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="text")
     */
    protected $body;

    /**
     * @ORM\Column(type="text")
     */
    protected $originalBody;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    protected $updatedAt;

    /**
     * @ORM\Column(type="smallint", length=1)
     */
    protected $status;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="comments")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $author;

    /**
     * @ORM\ManyToOne(targetEntity="Commentable", inversedBy="comments", cascade={"remove"})
     * @ORM\JoinColumn(name="commentable_id", referencedColumnName="id")
     */
    protected $commentable;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Comment
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Comment
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Comment
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set author
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\User $author
     *
     * @return Comment
     */
    public function setAuthor(\PHPDish\Bundle\PostBundle\Entity\User $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set body
     *
     * @param string $body
     *
     * @return Comment
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get body
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set originalBody
     *
     * @param string $originalBody
     *
     * @return Comment
     */
    public function setOriginalBody($originalBody)
    {
        $this->originalBody = $originalBody;

        return $this;
    }

    /**
     * Get originalBody
     *
     * @return string
     */
    public function getOriginalBody()
    {
        return $this->originalBody;
    }

    /**
     * Set commentable
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Commentable $commentable
     *
     * @return Comment
     */
    public function setCommentable(\PHPDish\Bundle\PostBundle\Entity\Commentable $commentable = null)
    {
        $this->commentable = $commentable;

        return $this;
    }

    /**
     * Get commentable
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\Commentable
     */
    public function getCommentable()
    {
        return $this->commentable;
    }
}
