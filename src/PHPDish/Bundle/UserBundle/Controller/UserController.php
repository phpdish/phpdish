<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use PHPDish\Bundle\CoreBundle\Controller\Controller;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Hateoas\Configuration\Route as HateoasRoute;
use Hateoas\Representation\Factory\PagerfantaFactory;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

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
     * @Route("/users/{username}/followers.{_format}", name="user_followers", defaults={"_format"="html"})
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function getUserFollowersAction($username, Request $request)
    {
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $followers = $manager->findUserFollowers($user, $request->query->getInt('page', 1));

        $view = $this->view($followers);
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
        $manager->followUser($user, $this->getUser());
        $data = [
            'follower_count' => $user->getFollowerCount()
        ];
        return $this->createJsonResponse($data);
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}