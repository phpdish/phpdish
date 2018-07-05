<?php

namespace PHPDish\Bundle\UserBundle\Twig;

use Doctrine\Common\Collections\Criteria;
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
}