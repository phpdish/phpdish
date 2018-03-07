<?php

namespace PHPDish\Bundle\UserBundle\Twig;

use Doctrine\Common\Collections\Criteria;
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
        ];
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