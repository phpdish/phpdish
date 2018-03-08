<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\JoinColumns;
use Money\Money;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\AbstractTaxonomy;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\PostBundle\Model\BookInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use JMS\Serializer\Annotation as JMS;

class Category extends AbstractTaxonomy implements BookInterface
{
    use IdentifiableTrait, EnabledTrait;

    protected $cover;

    protected $recommended = false;

    protected $postCount = 0;

    protected $followerCount = 0;

    /**
     * @var int
     */
    protected $charge = 0;

    /**
     * @var PostInterface[]|Collection
     * @JMS\Groups({"details"})
     */
    protected $posts;

    /**
     * 订阅者.
     *
     * @JMS\Groups({"details"})
     */
    protected $followers;

    /**
     * 创建人.
     *
     * @JMS\Groups({"details"})
     */
    protected $creator;

    /**
     * 管理员.
     *
     * @JMS\Groups({"details"})
     */
    protected $managers;

    /**
     * @var boolean
     */
    protected $isBook = false;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->posts = new ArrayCollection();
        $this->managers = new ArrayCollection();
        $this->followers = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
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
    public function getAuthor()
    {
        return $this->creator;
    }

    /**
     * {@inheritdoc}
     */
    public function setRecommended($recommended)
    {
        $this->recommended = $recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function isRecommended()
    {
        return $this->recommended;
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
    public function getPosts()
    {
        return $this->posts;
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
    public function getFollowers()
    {
        return $this->followers;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowers(array $followers)
    {
        $this->followers = $followers;

        return $this;
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

    /**
     * {@inheritdoc}
     */
    public function getSummary()
    {
        return $this->getPosts()->matching(Criteria::create()
            ->where(Criteria::expr()->isNull('parent'))
            ->andWhere(Criteria::expr()->eq('enabled', true))
        );
    }

    /**
     * {@inheritdoc}
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->creator === $user;
    }

    /**
     * {@inheritdoc}
     */
    public function asBook()
    {
        $this->isBook = true;
    }

    /**
     * {@inheritdoc}
     */
    public function isBook()
    {
        return $this->isBook;
    }

    /**
     * {@inheritdoc}
     */
    public function getCharge()
    {
        return $this->charge;
    }

    public function getChargePrice()
    {
        return Money::CNY($this->charge);
    }

    /**
     * {@inheritdoc}
     */
    public function setCharge($charge)
    {
        $this->charge = $charge;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function isCharging()
    {
        return $this->charge > 0;
    }
}
