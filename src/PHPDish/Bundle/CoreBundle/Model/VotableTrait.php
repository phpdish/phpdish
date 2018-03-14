<?php

namespace PHPDish\Bundle\CoreBundle\Model;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

trait VotableTrait
{
    /**
     * @var int
     */
    protected $voteCount = 0;

    /**
     * 投票的人
     *
     * @var UserInterface[]|Collection
     */
    protected $voters;

    /**
     * Set voteCount.
     *
     * @param int $voteCount
     *
     * @return $this
     */
    public function setVoteCount($voteCount)
    {
        $this->voteCount = $voteCount;

        return $this;
    }

    /**
     * Get voteCount.
     *
     * @return int
     */
    public function getVoteCount()
    {
        return $this->voteCount;
    }

    /**
     * 增加点赞次数
     *
     * @param int $count
     */
    public function addVoteCount($count = 1)
    {
        $this->voteCount += $count;
    }

    /**
     * 获取投票的人
     *
     * @return UserInterface[]
     */
    public function getVoters()
    {
        return $this->voters;
    }

    /**
     * 添加一个投票者
     *
     * @param UserInterface $user
     * @return self
     */
    public function addVoter(UserInterface $user)
    {
        $this->voters[] = $user;
        return $this;
    }

    /**
     * 移除一个投票者
     *
     * @param UserInterface $user
     * @return self
     */
    public function removeVoter(UserInterface $user)
    {
        $this->voters->removeElement($user);
        return $this;
    }
}
