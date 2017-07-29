<?php

namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ThreadController extends Controller
{
    /**
     * @Route("/thread/{slug}", name="thread_view")
     * @param string $slug
     * @param Request $request
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        $topics = $this->getTopicManager()->findThreadTopics($thread, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Thread:view.html.twig', [
            'thread' => $thread,
            'topics' => $topics
        ]);
    }

    /**
     * @return ThreadManagerInterface
     */
    protected function getThreadManager()
    {
        return $this->get('phpdish.manager.thread');
    }

    /**
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->get('phpdish.manager.topic');
    }
}
