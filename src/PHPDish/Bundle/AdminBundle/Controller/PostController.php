<?php

namespace PHPDish\Bundle\AdminBundle\Controller;

use PHPDish\Bundle\PostBundle\Form\Type\PostType;
use PHPDish\Bundle\PostBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    /**
     * @Route("/posts/{page}/{limit}", name="admin_post", defaults={"page"=1, "limit"=30}, requirements=
     *     {"page"="\d+", "limit"="\d+"})
     * @param int $page
     * @param int $limit
     * @return Response
     */
    public function indexAction($page, $limit)
    {
        $posts = $this->getDoctrine()->getEntityManager()->getRepository('PHPDishPostBundle:Post')
            ->createQueryBuilder('p');
        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate($posts, $page, $limit);
        return $this->render('PHPDishAdminBundle:Post:index.html.twig', [
            'pagination' => $pagination
        ]);
    }

    /**
     * @Route("/posts/create", name="admin_post_add")
     * @param Request $request
     * @return Response
     */
    public function create(Request $request)
    {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $post->setAuthor($this->getUser());
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($post);
            $em->flush();
        }
        return $this->render('PHPDishAdminBundle:Post:create.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
