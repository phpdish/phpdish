<?php
/**
 * Created by PhpStorm.
 * User: taosikai
 * Date: 2017/7/1
 * Time: 13:08.
 */

namespace PHPDish\Bundle\PostBundle\Controller;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Entity\Post;
use PHPDish\Bundle\PostBundle\Form\Type\CommentType;
use PHPDish\Bundle\PostBundle\Form\Type\PostType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPDish\Bundle\UserBundle\Controller\ManagerTrait as UserManagerTrait;

class PostController extends RestController
{
    use ManagerTrait;
    use UserManagerTrait;

    /**
     * @Route("/posts", name="post")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $posts = $this->getPostManager()->findLatestPosts($request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Post:index.html.twig', [
            'posts' => $posts,
        ]);
    }

    /**
     * 创建文章.
     *
     * @Route("/posts/new", name="post_add")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getPostManager();
        $post = $manager->createPost($this->getUser());
        $form = $this->createForm(PostType::class, $post, [
            'user' => $this->getUser(),
        ]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            if ($manager->savePost($post)) {
                return $this->redirectToRoute('post_view', [
                    'id' => $post->getId(),
                ]);
            } else {
                $this->addFlash('error', '文章无法创建');
            }
        }

        return $this->render('PHPDishWebBundle:Post:create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * 查看文章.
     *
     * @Route("/posts/{id}", name="post_view", requirements={"id": "\d+"})
     * @Method("GET")
     *
     * @param Post    $post
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction(Post $post, Request $request)
    {
        if (!$post->isEnabled()) {
            throw $this->createNotFoundException();
        }
        $form = $this->createForm(CommentType::class);
        $criteria = Criteria::create()->where(Criteria::expr()->eq('post', $post->getId()));
        $comments = $this->getPostCommentManager()->findComments($criteria, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Post:view.html.twig', [
            'post' => $post,
            'comments' => $comments,
            'form' => $form->createView(),
        ]);
    }

    /**
     * 修改文章.
     *
     * @Route("/post/{id}/edit", name="post_edit", requirements={"id": "\d+"})
     *
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($id, Request $request)
    {
        $post = $this->getPostManager()->findPostById($id);
        if (!$post) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $post);
        $form = $this->createForm(PostType::class, $post, [
            'user' => $this->getUser(),
        ]);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {
            $this->getPostManager()->savePost($post);

            return $this->redirectToRoute('post_view', [
                'id' => $post->getId(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Post:create.html.twig', [
            'form' => $form->createView(),
            'post' => $post,
        ]);
    }

    /**
     * 删除文章.
     *
     * @Route("/posts/{id}", name="post_delete", requirements={"id": "\d+"})
     * @Method("DELETE")
     *
     * @param int $id
     *
     * @return Response
     */
    public function deleteAction($id)
    {
        $manager = $this->getPostManager();
        $post = $manager->findPostById($id);
        if (!$post) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $post);
        $manager->blockPost($post);

        return $this->handleView($this->view([
            'result' => true,
        ]));
    }

    /**
     * 用户文章.
     *
     * @Route("/users/{username}/posts", name="user_posts")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function userPostsAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $posts = $this->getPostManager()->findUserPosts($user, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Post:user_posts.html.twig', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }

    /**
     * 推荐的文章.
     *
     * @param int $limit
     *
     * @return Response
     */
    public function recommendPostsAction($limit)
    {
        $criteria = Criteria::create()->orderBy(['isRecommended' => 'desc', 'createdAt' => 'desc'])
            ->andWhere(Criteria::expr()->gte('createdAt', Carbon::parse('-100 days')))
            ->setMaxResults($limit);
        $posts = $this->getPostManager()->findPostsByCriteria($criteria);

        return $this->render('PHPDishWebBundle:Post:recommend_posts.html.twig', [
            'posts' => $posts,
        ]);
    }
}
