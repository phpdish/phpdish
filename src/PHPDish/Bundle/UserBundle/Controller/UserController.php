<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends RestController
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
     * @Route("/users/{username}/followers.{_format}", name="user_followers", defaults={"_format"="html"})
     * @Method("GET")
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function getFollowersAction($username, Request $request)
    {
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $followers = $manager->findUserFollowers($user, $request->query->getInt('page', 1));

        $view = $this->view($followers->getCurrentPageResults());
        $view->setTemplateVar('followers')
            ->setTemplate('PHPDishWebBundle:User:followers.html.twig');
        return $this->handleView($view);
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
        $view = $this->view();
        try {
            $manager->followUser($user, $this->getUser());
            $view->setStatusCode(static::HTTP_CREATED)->setData([
                'follower_count' => $user->getFollowerCount()
            ]);
        } catch (\Exception $exception) {
            $view->setStatusCode(static::HTTP_BAD_REQUEST)
                ->setData([
                    'error' => $exception->getMessage()
                ]);
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