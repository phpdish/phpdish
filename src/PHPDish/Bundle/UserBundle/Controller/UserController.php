<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * @Route("/users/{username}", name="user_view", requirements={"username": "\w+"})
     * @param string $username
     * @return Response
     */
    public function viewAction($username)
    {
        $user = $this->getUserManager()->findUserByName($username);
        return $this->render('PHPDishWebBundle:User:view.html.twig', [
            'user' => $user
        ]);
    }

    /**
     * @param int $limit
     * @return Response
     */
    public function latestUsersAction($limit)
    {
        $users = $this->getUserManager()->findLatestUsers($limit);
        return $this->render('PHPDishWebBundle:User:latest.html.twig', [
            'users' => $users
        ]);
    }

    public function userFollowingAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowing($user, 1);
        return $this->render('PHPDishWebBundle:User:user_grid.html.twig', [
            'users' => $following
        ]);
    }

    public function userFollowersAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowers($user, 1);
        return $this->render('PHPDishWebBundle:User:user_grid.html.twig', [
            'users' => $following
        ]);
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}