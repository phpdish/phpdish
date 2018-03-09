<?php

namespace PHPDish\Bundle\ForumBundle\Entity;

use Carbon\Carbon;
use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\CoreBundle\Entity\Taxonomy;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Thread extends Taxonomy implements ThreadInterface
{
    use IdentifiableTrait, EnabledTrait;

    /**
     * @var string
     */
    protected $cover;

    /**
     * @var int
     */
    protected $topicCount = 0;

    /**
     * @var int
     */
    protected $followerCount = 0;

    /**
     * 订阅者.
     * @var Collection|array
     */
    protected $followers;

    public function __construct()
    {
        $this->createdAt = $this->updatedAt = Carbon::now();
    }

    public function __toString()
    {
        return (string)$this->getName();
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
