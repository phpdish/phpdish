<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\UserBundle\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="posts")
 * @ORM\HasLifecycleCallbacks
 */
class Post implements PostInterface
{
    use Commentable, Votable;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=150)
     */
    protected $title;

    /**
     * @ORM\Column(type="text")
     */
    protected $body = 'test';

    /**
     * @ORM\Column(type="text")
     */
    protected $originalBody;

    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $viewCount = 0;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    protected $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="posts")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $author;

    /**
     * @ORM\OneToMany(targetEntity="PostVote", mappedBy="post")
     * @ORM\JoinColumn(name="votable_id", referencedColumnName="id")
     */
    protected $votes;

    /**
     * @ORM\OneToMany(targetEntity="PostComment", mappedBy="post")
     * @ORM\JoinColumn(name="commentable_id", referencedColumnName="id")
     */
    protected $comments;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->votes = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

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
     * Set title
     *
     * @param string $title
     *
     * @return Post
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set body
     *
     * @param string $body
     *
     * @return Post
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
     * @return Post
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
     * Set viewCount
     *
     * @param integer $viewCount
     *
     * @return Post
     */
    public function setViewCount($viewCount)
    {
        $this->viewCount = $viewCount;

        return $this;
    }

    /**
     * Get viewCount
     *
     * @return integer
     */
    public function getViewCount()
    {
        return $this->viewCount;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Post
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
     * @return Post
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
     * Set author
     *
     * @param User $author
     *
     * @return Post
     */
    public function setAuthor(User $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Gets the summary of the post
     * @return string
     */
    public function getSummary()
    {
        return mb_substr($this->body, 0, 250);
    }

    /**
     * Get author
     *
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateTimestamps()
    {
        if (is_null($this->createdAt)) {
            $this->createdAt = new \DateTime();
        }
        $this->updatedAt = new \DateTime();
    }
}
