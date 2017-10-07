<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicReplyType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TopicReplyController extends RestController
{
    use ManagerTrait;

    /**
     * 删除回复
     * @Route("/replies/{id}", name="topic_reply_delete", requirements={"id": "\d+"})
     * @param int $id
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
            'result' => true
        ]));
    }

    /**
     * @Route("/users/{username}/replies", name="user_replies")
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function getUserRepliesAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $replies = $this->getReplyManager()
            ->findUserReplies($user, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:TopicReply:user_replies.html.twig', [
            'user' => $user,
            'replies' => $replies
        ]);
    }

    /**
     * @Route("/topics/{id}/replies", name="topic_add_reply")
     * @Method("POST")
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function addTopicReply($id, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $topic = $this->getTopicManager()->findTopicById($id);
        $reply = $this->getReplyManager()->createReply($topic, $this->getUser());
        $form =  $this->createForm(TopicReplyType::class, $reply);
        $form->handleRequest($request);
        $view = $this->view()->setFormat('json');
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getReplyManager()->saveReply($reply);
            $view->setData(['reply' => $reply])
                ->getContext()
                ->addGroups(['Default']);
        } else {
            $view->setStatusCode(400)
                ->setData(array(
                    'form' => $form,
                ));
        }
        return $this->handleView($view);
    }
}