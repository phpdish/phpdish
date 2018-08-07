<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends ResourceController
{
    use ManagerTrait;

    /**
     * 用户首页
     * 
     * @param string $username
     *
     * @return Response
     */
    public function viewAction($username)
    {
        return $this->forward('PHPDishForumBundle:Topic:getUserTopics', [
            'username' => $username,
        ]);
    }

    /**
     * 最近注册的用户.
     *
     * @param int $limit
     *
     * @return Response
     */
    public function latestUsersAction($limit)
    {
        $users = $this->getUserManager()->findLatestUsers($limit, true);
        return $this->render('PHPDishWebBundle:User:latest.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * 用户关注的人.
     *
     * @param UserInterface $user
     *
     * @return Response
     */
    public function userFollowingAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowing($user, 1);

        return $this->render($this->configuration->getTemplate('User:user_grid.html.twig'), [
            'users' => $following,
        ]);
    }

    /**
     * 用户的粉丝.
     *
     * @param UserInterface $user
     *
     * @return Response
     */
    public function userFollowersAction(UserInterface $user)
    {
        $following = $this->getUserManager()->findUserFollowers($user, 1);

        return $this->render($this->configuration->getTemplate('User:user_grid.html.twig'), [
            'users' => $following,
        ]);
    }

    /**
     * 获取用户关注的人.
     *
     * @Route("/users/{username}/following", name="user_following")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function getUserFollowingAction($username, Request $request)
    {
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $following = $manager->findUserFollowing($user, $request->query->getInt('page', 1));

        return $this->render($this->configuration->getTemplate('User:user_following.html.twig'), [
            'user' => $user,
            'users' => $following,
        ]);
    }

    /**
     * @Route("/users/{username}/followers.{_format}", name="user_followers", defaults={"_format"="html"})
     * @Method("GET")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function getUserFollowersAction($username, Request $request)
    {
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $followers = $manager->findUserFollowers($user, $request->query->getInt('page', 1));

        $view = $this->view([
                'user' => $user,
                'followers' => $followers,
            ])->setTemplate($this->configuration->getTemplate('User:user_followers.html.twig'));

        return $this->handleView($view);
    }

    /**
     * @Route("/users/{username}/followers", name="follower_add")
     * @Method("POST")
     *
     * @param string $username
     *
     * @return Response
     */
    public function followAction($username)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $view = $this->view();
        try {
            $manager->followUser($user, $this->getUser());
            $view->setStatusCode(static::HTTP_CREATED)->setData([
                'follower_count' => $user->getFollowerCount(),
            ]);
        } catch (\Exception $exception) {
            $view->setStatusCode(static::HTTP_BAD_REQUEST)
                ->setData([
                    'error' => $exception->getMessage(),
                ]);
        }

        return $this->handleView($view);
    }

    /**
     * @Route("/users/{username}/followers", name="follower_delete")
     * @Method("DELETE")
     *
     * @param string $username
     *
     * @return Response
     */
    public function unFollowAction($username)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $view = $this->view();
        $manager->unFollowUser($user, $this->getUser());
        $view->setStatusCode(static::HTTP_OK)->setData([
            'follower_count' => $user->getFollowerCount(),
        ]);

        return $this->handleView($view);
    }

    /**
     * 用户积分
     *
     * @Route("/users/{username}/points", name="user_points")
     *
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function pointAction($username, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getUserManager();
        $user = $manager->findUserByName($username);
        $histories = $this->getPointManager()->findPointHistories($user, $request->get('page', 1));
        return $this->render($this->configuration->getTemplate('User:point_history.html.twig'), [
            'histories' => $histories,
            'user' => $user,
        ]);
    }
}
