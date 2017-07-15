<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\JoinColumns;
use PHPDish\Bundle\CoreBundle\Model\Taxonomy;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Entity\User;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="blogs")
 */
class Category extends Taxonomy implements CategoryInterface
{
    /**
     * @ORM\Column(type="string")
     */
    protected $cover;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $isRecommended;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $isBlocked;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $postCount;

    /**
     * @ORM\OneToMany(targetEntity="PHPDish\Bundle\PostBundle\Entity\Post", mappedBy="category")
     */
    protected $posts;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $subscriberCount;

    /**
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", mapedBy="subscribedBlogs")
     */
    protected $subscribers;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="categories")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $creator;

    /**
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="manageableCategories")
     * @ORM\JoinTable(name="user_categories",
     *     joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")}，
     *     inverseJoinColumns={@JoinColumn(name="category_id", referencedColumnName="id", unique=true)}
     * )
     */
    protected $authors;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->subscribers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function setPostCounts($postCounts)
    {
        $this->postCount = $postCounts;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPostCount()
    {
        return $this->postCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setCover($cover)
    {
        $this->cover = $cover;
    }

    /**
     * {@inheritdoc}
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * {@inheritdoc}
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * {@inheritdoc}
     */
    public function setIsBlocked($isBlocked)
    {
        $this->isBlocked = $isBlocked;
    }

    /**
     * {@inheritdoc}
     */
    public function isBlocked()
    {
        return $this->isBlocked;
    }

    /**
     * {@inheritdoc}
     */
    public function setIsRecommended($isRecommended)
    {
        $this->isRecommended = $isRecommended;
    }

    /**
     * {@inheritdoc}
     */
    public function isRecommended()
    {
        return $this->isRecommended;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscriberCount()
    {
        return $this->subscriberCount;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribers()
    {
        return $this->subscribers;
    }

    /**
     * {@inheritdoc}
     */
    public function setCreator(UserInterface $creator)
    {
        $this->creator = $creator;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthors()
    {
        return $this->authors;
    }

    /**
     * {@inheritdoc}
     */
    public function addAuthor(UserInterface $user)
    {
        $this->authors[] = $user;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * {@inheritdoc}
     */
    public function addPost(PostInterface $post)
    {
        $this->posts[] = $post;
        return $this;
    }
}
