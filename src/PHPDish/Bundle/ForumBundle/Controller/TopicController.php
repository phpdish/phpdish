<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use Carbon\Carbon;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicType;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TopicController extends Controller
{
    /**
     * @Route("/topics/new", name="topic_add")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getTopicManager();
        $topic = $manager->createTopic($this->getUser());
        $form = $this->createForm(TopicType::class, $topic);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager->saveTopic($topic);
            return $this->redirectToRoute('topic_view', [
                'id' => $topic->getId()
            ]);
        }
        return $this->render('PHPDishWebBundle:Topic:create.html.twig',  [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/topics/{id}", name="topic_view", requirements={"id": "\d+"})
     * @param int $id
     * @return Response
     */
    public function viewAction($id)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        return $this->render('PHPDishWebBundle:Topic:view.html.twig', [
            'topic' => $topic
        ]);
    }

    /**
     * @Route("/users/{username}/topics", name="user_topics")
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function userTopicsAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $topics = $this->getTopicManager()->findUserTopics($user, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Topic:user_topics.html.twig', [
            'user' => $user,
            'topics' => $topics
        ]);
    }

    /**
     * 今日热帖
     * @param int|null $max
     * @return Response
     */
    public function todayHotTopicsAction($max = null)
    {
        $date = Carbon::today()->modify('-3 days');
        $topics = $this->getTopicManager()->findHotTopics($date, $max ?: 10);
        return $this->render('PHPDishWebBundle:Topic:today_hot.html.twig', [
            'topics' => $topics
        ]);
    }

    /**
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->get('phpdish.manager.topic');
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}
