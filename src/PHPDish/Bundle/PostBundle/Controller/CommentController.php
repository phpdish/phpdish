<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use FOS\RestBundle\Context\Context;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostCommentedEvent;
use PHPDish\Bundle\PostBundle\Form\Type\CommentType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends RestController
{
    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;
    use ManagerTrait;

    /**
     * 添加评论.
     *
     * @Route("/posts/{id}/comments", name="comment_add")
     * @Method("POST")
     *
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function addAction($id, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $post = $this->getPostManager()->findPostById($id);
        $comment = $this->getPostCommentManager()->createComment($post, $this->getUser());
        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        $view = $this->view();
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getPostCommentManager()->saveComment($comment);

            //触发文章评论事件
            $this->get('event_dispatcher')->dispatch(Events::POST_COMMENTED, new PostCommentedEvent($post, $comment));

            $view->setData(['comment' => $comment])
                ->setStatusCode(static::HTTP_CREATED)
                ->setContext((new Context())->setGroups(['Default']));
        } else {
            $view->setData([ 'form' => $form])
                ->setStatusCode(static::HTTP_BAD_REQUEST);
        }

        return $this->handleView($view);
    }

    /**
     * 删除评论.
     *
     * @Route("/comments/{id}", name="comment_delete")
     * @Method("DELETE")
     *
     * @param int $id
     *
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
            'result' => true,
        ]));
    }

    /**
     * 切换点赞状态
     *
     * @Route("/comments/{id}/voters", name="comment_toggle_voter", methods={"POST"})
     */
    public function toggleVoterAction($id)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $comment = $this->getPostCommentManager()->findCommentById($id);
        if (!$comment) {
            throw new \InvalidArgumentException($this->get('translator')->trans('comment.not_exists'));
        }
        if ($isVoted = $comment->isVotedBy($this->getUser())) {
            $this->getPostCommentManager()->removeVoter($comment, $this->getUser());
        } else {
            $this->getPostCommentManager()->addVoter($comment, $this->getUser());
        }
        return $this->json([
            'vote_count' => $comment->getVoteCount(),
            'is_voted' => !$isVoted
        ]);
    }
}
