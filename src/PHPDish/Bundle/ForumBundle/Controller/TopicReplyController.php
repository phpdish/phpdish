<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

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
     * @param int $topicId
     * @param Request $request
     */
    public function addTopicReply($topicId, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $topic = $this->getTopicManager()->findTopicById($topicId);
        $reply = $this->getReplyManager()->createReply($topic);

    }
}