<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\JoinColumns;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\Taxonomy;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="categories")
 */
class Category extends Taxonomy implements CategoryInterface
{
    use EnabledTrait;

    /**
     * @ORM\Column(type="string")
     */
    protected $cover;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $isRecommended = false;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $postCount = 0;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $followerCount = 0;

    /**
     * 订阅者.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="followingCategories")
     * @ORM\JoinTable(name="categories_followers",
     *     joinColumns={@JoinColumn(name="category_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="id")}
     * )
     */
    protected $followers;

    /**
     * 创建人.
     *
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $creator;

    /**
     * 管理员.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     * @ORM\JoinTable(name="categories_managers",
     *     joinColumns={@JoinColumn(name="category_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="id", unique=true)}
     * )
     */
    protected $managers;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->managers = new ArrayCollection();
        $this->followers = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function setPostCount($postCount)
    {
        $this->postCount = $postCount;

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
    public function setRecommended($recommended)
    {
        $this->isRecommended = $recommended;
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
    public function setCreator(UserInterface $creator)
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getManagers()
    {
        return $this->managers;
    }

    /**
     * {@inheritdoc}
     */
    public function addManager(UserInterface $user)
    {
        $this->managers[] = $user;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function addFollower(UserInterface $user)
    {
        $this->followers[] = $user;
    }

    /**
     * {@inheritdoc}
     */
    public function removeFollower(UserInterface $user)
    {
        $this->followers->removeElement($user);
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowerCount()
    {
        return $this->followerCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowerCount($count)
    {
        $this->followerCount = $count;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contains($user);
    }
}
