<?php
/**
 * Created by PhpStorm.
 * User: taosikai
 * Date: 2017/7/1
 * Time: 13:08
 */

namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\PostBundle\Entity\Comment;
use PHPDish\Bundle\PostBundle\Entity\Post;
use PHPDish\Bundle\PostBundle\Entity\Question;
use PHPDish\Bundle\PostBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class QuestionsController extends Controller
{
    /**
     * @Route(name="post_index", path="/posts")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager()->getRepository('PHPDishPostBundle:Post');
        $posts = $em->findAll();
        dump($posts);
        return new Response();
    }

    /**
     * @Route("/posts/{id}", name="post_view", requirements={"id": "\d+"})
     * @param Post $post
     */
    public function viewAction(Post $post)
    {
        dump($post->getComments()->toArray());
        return new Response();
    }

    /**
     * @Route("/questions/add", name="add_post")
     */
    public function add()
    {
        $post = new Question();
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

        $comment = new Comment();
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