<?php
/**
 * PHPDish vote component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\CoreBundle\Model;

interface VotableInterface
{
    /**
     * 设置投票数量
     * @param int $voteCount
     * @return VotableInterface
     */
    public function setVoteCount($voteCount);

    /**
     * 获取赞次数
     * @return int
     */
    public function getVoteCount();

    /**
     * 获取所有的赞
     * @return VoteInterface[]
     */
    public function getVotes();

    /**
     * 添加投票记录
     * @param VoteInterface $vote
     * @return VotableInterface
     */
    public function addVote(VoteInterface $vote);

    /**
     * 移除投票记录
     * @param VoteInterface $vote
     * @return VotableInterface
     */
    public function removeVote(VoteInterface $vote);
}