<?php
/**
 * Created by PhpStorm.
 * User: taosikai
 * Date: 2017/7/1
 * Time: 13:08
 */

namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\PostBundle\Entity\PostComment;
use PHPDish\Bundle\PostBundle\Entity\Post;
use PHPDish\Bundle\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PostsController extends Controller
{
    /**
     * @Route("/posts/{id}", name="post_view", requirements={"id": "\d+"})
     * @param Post $post
     * @return Response
     */
    public function viewAction(Post $post)
    {
        return $this->render('PHPDishWebBundle:Post:view.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @Route("/users/{username}/posts", name="user_posts")
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function userPostsAction($username, Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $query = $em->getRepository('PHPDishWebBundle:Post')->createQueryBuilder('n');
        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate($query, $request->query->getInt('page', 1), 10);
        return $this->render('PHPDishWebBundle:Post:user_posts.html.twig',  [
            'pagination' => $pagination,
        ]);
    }

    /**
     * @Route("/posts/add", name="add_post")
     */
    public function add()
    {
        $post = new Post();
        $user = new User();
        $user->setEmail('email');
        $user->setUsername('foo');
        $user->setPassword('foo');
        $user->setIsBlocked(false);
        $user->setCreatedAt(new \DateTime());
        $user->setUpdatedAt(new \DateTime());


        $post->setAuthor($user);
        $post->setTitle('test test');
        $post->setBody('content');
        $post->setOriginalBody('content');
        $post->setCreatedAt(new \DateTime());
        $post->setUpdatedAt(new \DateTime());

        $comment = new PostComment();
        $comment->setCreatedAt(new \DateTime());
        $comment->setUpdatedAt(new \DateTime());
        $comment->setBody('asa');
        $comment->setOriginalBody('asa');
        $comment->setAuthor($user);
        $comment->setStatus(0);

        $post->addComment($comment);

        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($post);
        $em->persist($comment);
        $em->persist($user);
        $em->flush();
        return new Response();
    }
}