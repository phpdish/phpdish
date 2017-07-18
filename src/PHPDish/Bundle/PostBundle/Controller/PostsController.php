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
use PHPDish\Bundle\PostBundle\Form\Type\PostType;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBag;

class PostsController extends Controller
{
    /**
     * 创建文章
     * @Route("/write", name="post_add")
     * @param Request $request
     * @return Response
     */
    public function addAction(Request $request)
    {
        $manager = $this->get('post.post_manager');
        $post = $manager->createPost($this->getUser());
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            if ($manager->savePost($post)) {
                return $this->redirectToRoute('post_view', [
                    'id' => $post->getId()
                ]);
            } else {
                $request->getSession()->getFlashBag()->add('error', '文章无法创建');
            }
        }
        return $this->render('PHPDishWebBundle:Post:add.html.twig', [
            'form' => $form->createView()
        ]);
    }

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
     * 获取post repository
     * @return PostRepository
     */
    protected function getPostRepository()
    {
        return $this->getDoctrine()->getEntityManager()->getRepository('PHPDishPostBundle:Post');
    }
}