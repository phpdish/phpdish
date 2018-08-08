<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TopicReplyController extends ResourceController
{
    use ManagerTrait;

    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;

    /**
     * 删除回复.
     *
     * @Route("/replies/{id}", name="topic_reply_delete", requirements={"id": "\d+"}, methods={"DELETE"})
     *
     * @param int $id
     *
     * @return Response
     */
    public function deleteAction($id)
    {
        $manager = $this->getReplyManager();
        $reply = $manager->findReplyById($id);
        if (!$reply) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $reply);
        $manager->blockReply($reply);

        return $this->handleView($this->view([
            'result' => true,
        ]));
    }

    /**
     * 获取用户的回复
     *
     * @Route("/users/{username}/replies", name="user_replies")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function getUserRepliesAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $replies = $this->getReplyManager()
            ->findUserReplies($user, $request->query->getInt('page', 1));

        return $this->render($this->configuration->getTemplate('Topic:user_replies.html.twig'), [
            'user' => $user,
            'replies' => $replies,
        ]);
    }

    /**
     * 切换点赞状态
     *
     * @Route("/replies/{id}/voters", name="topic_reply_toggle_voter", methods={"POST"})
     *
     * @param int $id
     */
    public function toggleVoterAction($id)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $reply = $this->getReplyManager()->findReplyById($id);
        if (!$reply) {
            throw new \InvalidArgumentException($this->get('translator')->trans('reply.not_exists'));
        }

        if ($isVoted = $reply->isVotedBy($this->getUser())) {
            $this->getReplyManager()->removeVoter($reply, $this->getUser());
        } else {
            $this->getReplyManager()->addVoter($reply, $this->getUser());
        }
        return $this->json([
            'vote_count' => $reply->getVoteCount(),
            'is_voted' => !$isVoted
        ]);
    }
}
