<?php
namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Form\Type\CommentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use PHPDish\Bundle\PostBundle\Entity\Post;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends RestController
{
    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;
    use ManagerTrait;

    /**
     * 添加评论
     * @Route("/posts/{id}/comments", name="comment_add")
     * @Method("POST")
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function addAction($id, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $post = $this->getPostManager()->findPostById($id);
        $comment =  $this->getPostCommentManager()->createComment($post, $this->getUser());
        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        $view = $this->view();
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getPostCommentManager()->saveComment($comment);
            $view->setData([
                    'comment' => $comment
                ])
                ->setStatusCode(static::HTTP_CREATED)
                ->getContext()->enableMaxDepth()->setGroups(['Default']);
        } else {
            $view->setData([
                    'form' => $form
                ])
                ->setStatusCode(static::HTTP_BAD_REQUEST);
        }
        return $this->handleView($view);
    }


    /**
     * 删除评论
     * @Route("/comments/{id}", name="comment_delete")
     * @Method("DELETE")
     * @param int $id
     * @return Response
     */
    public function deleteAction($id)
    {
        $manager = $this->getPostCommentManager();
        $comment = $manager->findCommentById($id);

        if (!$comment) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $comment);

        $manager->blockComment($comment);

        return $this->handleView($this->view([
            'result' => true
        ]));
    }
}