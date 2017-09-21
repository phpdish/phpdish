<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicReplyType;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TopicController extends Controller
{
    use ManagerTrait;

    /**
     * @Route("/", name="homepage")
     * @Route("/topics", name="topic")
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $manager = $this->getTopicManager();
        $criteria = Criteria::create();
        $criteria->orderBy(['repliedAt' => 'desc']);

        $tab = $request->query->get('tab');
        if ($tab && $tab === 'good') {
            $criteria->where(Criteria::expr()->eq('recommended', true));
        }
        $topics = $manager->findTopics($criteria, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Topic:index.html.twig', [
            'topics' => $topics
        ]);
    }

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
     * @param Request $request
     * @return Response
     */
    public function viewAction($id, Request $request)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        $replies = $this->getReplyManager()->findTopicReplies($topic, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Topic:view.html.twig', [
            'topic' => $topic,
            'replies' => $replies,
        ]);
    }
    /**
     * @Route("/topics/{id}/edit", name="topic_edit", requirements={"id": "\d+"})
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function editAction($id, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic || !$topic->isBelongsTo($this->getUser())) {
            $this->createNotFoundException();
        }
        $form = $this->createForm(TopicType::class, $topic);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getTopicManager()->saveTopic($topic);
            return $this->redirectToRoute('topic_view', [
                'id' => $topic->getId()
            ]);
        }
        return $this->render('PHPDishWebBundle:Topic:create.html.twig', [
            'form' => $form->createView(),
            'topic' => $topic
        ]);
    }

    /**
     * @Route("/users/{username}/topics", name="user_topics")
     * @param string $username
     * @param Request $request
     * @return Response
     */
    public function getUserTopicsAction($username, Request $request)
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
        $date = Carbon::today()->modify('-100 days');
        $topics = $this->getTopicManager()->findHotTopics($date, $max ?: 10);
        return $this->render('PHPDishWebBundle:Topic:today_hot.html.twig', [
            'topics' => $topics
        ]);
    }
}
