<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicReplyType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TopicReplyController extends FOSRestController
{
    use ManagerTrait;

    /**
     * @Route("/topics/{id}/replies", name="topic_replies")
     * @Method("GET")
     * @param int $topicId
     * @param Request $request
     */
    public function getRepliesAction($topicId, Request $request)
    {
        $topicManager = $this->getTopicManager()->findTopicById($topicId);
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
        $reply = $this->getReplyManager()->createReply($topic);
        $form =  $this->createForm(TopicReplyType::class, $reply);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isValid()) {
            $this->getReplyManager()->saveReply($reply);
            return $this->handleView($this->routeRedirectView('topic_replies'));
        }
        $view = $this->view()
            ->setStatusCode(400)
            ->setData(array(
                'form' => $form,
                'topicId' => $id,
            ));
        return $this->handleView($view);
    }
}