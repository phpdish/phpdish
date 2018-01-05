<?php

namespace PHPDish\Bundle\ForumBundle\Entity;

use Carbon\Carbon;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\Taxonomy;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="threads")
 */
class Thread extends Taxonomy implements ThreadInterface
{
    use EnabledTrait;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $cover;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $topicCount = 0;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    protected $followerCount = 0;

    /**
     * 订阅者.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="followingThreads")
     * @ORM\JoinTable(name="threads_followers",
     *     joinColumns={@ORM\JoinColumn(name="thread_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")}
     * )
     * @var Collection|array
     */
    protected $followers;

    public function __construct()
    {
        $this->createdAt = $this->updatedAt = Carbon::now();
    }

    public function __toString()
    {
        return $this->getName();
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
    public function setCover($cover)
    {
        $this->cover = $cover;
    }

    /**
     * {@inheritdoc}
     */
    public function getTopicCount()
    {
        return $this->topicCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setTopicCount($topicCount)
    {
        $this->topicCount = $topicCount;
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
    public function setFollowerCount($followerCount)
    {
        $this->followerCount = $followerCount;
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
    }

    /**
     * {@inheritdoc}
     */
    public function addFollower(UserInterface $user)
    {
        $this->followers[]= $user;
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
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contains($user);
    }
}
