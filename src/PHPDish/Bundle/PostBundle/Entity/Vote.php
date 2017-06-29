<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="votes")
 */
class Vote
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="string", length=25)
     */
    protected $viteType;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="votes")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $author;

    /**
     * @ORM\ManyToOne(targetEntity="Post", inversedBy="votes")
     * @ORM\JoinColumn(name="votable_id", referencedColumnName="id")
     */
    protected $post;

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
     * @return Vote
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
     * Set viteType
     *
     * @param string $viteType
     *
     * @return Vote
     */
    public function setViteType($viteType)
    {
        $this->viteType = $viteType;

        return $this;
    }

    /**
     * Get viteType
     *
     * @return string
     */
    public function getViteType()
    {
        return $this->viteType;
    }

    /**
     * Set author
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\User $author
     *
     * @return Vote
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
     * Set post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Post $post
     *
     * @return Vote
     */
    public function setPost(\PHPDish\Bundle\PostBundle\Entity\Post $post = null)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * Get post
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\Post
     */
    public function getPost()
    {
        return $this->post;
    }
}
