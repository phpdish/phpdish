<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

class UserController extends FOSRestController
{
    /**
     * @Route("/users/{username}", name="user_view", requirements={"username": "\w+"})
     * @param string $username
     * @return Response
     */
    public function viewAction($username)
    {
        return $this->forward('PHPDishPostBundle:Post:userPosts', [
            'username' => $username
        ]);
    }

    /**
     * 最近注册的用户
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

    /**
     * 用户关注的人
     * @param UserInterface $user
     * @return Response
     */
    public function userFollowingAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowing($user, 1);
        return $this->render('PHPDishWebBundle:User:user_grid.html.twig', [
            'users' => $following
        ]);
    }

    /**
     * 用户的粉丝
     * @param UserInterface $user
     * @return Response
     */
    public function userFollowersAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowers($user, 1);
        return $this->render('PHPDishWebBundle:User:user_grid.html.twig', [
            'users' => $following
        ]);
    }

    /**
     * @Route("/users/{username}/followers", name="follower_add")
     * @Method("POST")
     * @param string $username
     * @return Response
     */
    public function followAction($username)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        if ($manager->followUser($user, $this->getUser())) {
            $view = $this->view([
                'follower_count' => $user->getFollowerCount()
            ]);
        } else {
            $view = $this->view(null, 400);
        }
        return $this->handleView($view);
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}