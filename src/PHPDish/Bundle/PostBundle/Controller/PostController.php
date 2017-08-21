<?php
/**
 * Created by PhpStorm.
 * User: taosikai
 * Date: 2017/7/1
 * Time: 13:08
 */

namespace PHPDish\Bundle\PostBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\PostBundle\Entity\Post;
use PHPDish\Bundle\PostBundle\Form\Type\CommentType;
use PHPDish\Bundle\PostBundle\Form\Type\PostType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPDish\Bundle\UserBundle\Controller\ManagerTrait as UserManagerTrait;

class PostController extends Controller
{
    use ManagerTrait;
    use UserManagerTrait;

    /**
     * @
     */
    public function indexAction()
    {

    }

    /**
     * 创建文章
     * @Route("/write", name="post_add")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getPostManager();
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
     * @param Request $request
     * @return Response
     */
    public function viewAction(Post $post,  Request $request)
    {
        $form = $this->createForm(CommentType::class);
        $criteria = Criteria::create()->where(Criteria::expr()->eq('post', $post->getId()));
        $comments = $this->getPostCommentManager()->findComments($criteria, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Post:view.html.twig', [
            'post' => $post,
            'comments' =>  $comments,
            'form' => $form->createView()
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
        $user = $this->getUserManager()->findUserByName($username);
        $posts = $this->getPostManager()->findUserPosts($user, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Post:user_posts.html.twig', [
            'user' => $user,
            'posts' => $posts
        ]);
    }
}