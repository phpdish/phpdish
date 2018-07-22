<?php

namespace PHPDish\Bundle\UserBundle\Twig;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\UserBundle\Model\PointHistory;
use PHPDish\Bundle\UserBundle\Model\PointHistoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;

class UserExtension extends \Twig_Extension
{
    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('get_user', [$this->userManager, 'findUserById']),
            new \Twig_SimpleFunction('get_user_by_username', [$this->userManager, 'findUserByUsername']),
            new \Twig_SimpleFunction('get_user_by_email', [$this->userManager, 'findUserByEmail']),
            new \Twig_SimpleFunction('get_user_by_username_or_email', [$this->userManager, 'findUserByUsernameOrEmail']),
            new \Twig_SimpleFunction('get_users', [$this, 'getUsers']),
            new \Twig_SimpleFunction('get_users_pager', [$this->userManager, 'findUsersPager']),
            new \Twig_SimpleFunction('get_category_authors', [$this, 'getCategoryAuthors']),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('point_history_type', [$this, 'getPointHistoryLabel'])
        ];
    }

    /**
     * 获取专栏作者
     *
     * @param int $limit
     * @return UserInterface[]
     */
    public function getCategoryAuthors($limit = 10)
    {
        $qb = $this->userManager->getUserRepository()->createQueryBuilder('u');

        return $qb->select('distinct u')
            ->innerJoin('u.categories', 'c')
            ->where('c.postCount > :postCount')->setParameter('postCount', 0)
            ->setMaxResults($limit)
            ->orderBy('u.updatedAt', 'desc')
            ->getQuery()
            ->getResult();
    }

    /**
     * 指定条件查找用户
     *
     * @param array| $criteria
     * @param array $orderBy
     * @param int $limit
     * @return array
     */
    public function getUsers($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->userManager->findUsersByCriteria($criteria);
        } else {
            return $this->userManager->getUserRepository()->findBy($criteria, $orderBy, $limit);
        }
    }

    /**
     * 获取积分历史类型
     *
     * @param PointHistoryInterface $history
     * @return string
     */
    public function getPointHistoryLabel(PointHistoryInterface $history)
    {
        static $labels = [
            PointHistory::TYPE_SIGN_IN => 'point.history.type.sign_in',
            PointHistory::TYPE_CHECK_IN => 'point.history.type.check_in',

            //资源
            PointHistory::TYPE_POST_TOPIC => 'point.history.type.post_topic',
            PointHistory::TYPE_POST_ARTICLE => 'point.history.type.post_article',
            // 资源被删除
            PointHistory::TYPE_REMOVE_TOPIC => 'point.history.type.remove_topic',
            PointHistory::TYPE_REMOVE_POST => 'point.history.type.remove_post',

            PointHistory::TYPE_POST_TOPIC_REPLY => 'point.history.type.post_topic_reply', //回复主题
            PointHistory::TYPE_TOPIC_REPLY => 'point.history.type.topic_reply', //主题被回复，

            PointHistory::TYPE_TOPIC_VOTED => 'point.history.type.topic_voted',
            PointHistory::TYPE_REPLY_VOTED => 'point.history.type.reply_voted',
            PointHistory::TYPE_AWARD => 'point.history.type.award',
        ];

        return $labels[$history->getType()] ?? 'point.history.type.unknown';
    }
}