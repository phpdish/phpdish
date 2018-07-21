<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\CmsBundle\Model\AbstractTaxonomy;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Thread extends AbstractTaxonomy implements ThreadInterface
{
    use IdentifiableTrait;

    /**
     * @var string
     */
    protected $cover;

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
        $this->followers = new ArrayCollection();
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
