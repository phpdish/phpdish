<?php
/**
 * PHPDish vote component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\PostBundle\Entity;

interface VotableInterface
{
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
}