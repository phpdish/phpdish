<?php

namespace PHPDish\Bundle\ForumBundle\Controller;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\TopicRepliedEvent;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicReplyType;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicType;
use PHPDish\Component\Util\StringManipulator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class TopicController extends RestController
{
    use ManagerTrait;

    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;

    /**
     * 话题列表.
     *
     * @Route("/", name="homepage")
     * @Route("/topics", name="topic")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $manager = $this->getTopicManager();
        $criteria = Criteria::create();
        $criteria->orderBy(['repliedAt' => 'desc'])->where(Criteria::expr()->eq('enabled', true));

        $tab = $request->query->get('tab');
        if ($tab && $tab === 'recommend') {
            $criteria->andWhere(Criteria::expr()->eq('recommended', true));
        }
        $topics = $manager->findTopics($criteria, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Topic:index.html.twig', [
            'topics' => $topics,
        ]);
    }

    /**
     * 创建话题.
     *
     * @Route("/topics/new", name="topic_add")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getTopicManager();
        $topic = $manager->createTopic($this->getUser());
        $form = $this->createForm(TopicType::class, $topic);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager->saveTopic($topic);

            return $this->redirectToRoute('topic_view', [
                'id' => $topic->getId(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Topic:create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * 查看话题.
     *
     * @Route("/topics/{id}", name="topic_view", requirements={"id": "\d+"})
     * @Method("GET")
     *
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction($id, Request $request)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic || !$topic->isEnabled()) {
            throw $this->createNotFoundException();
        }
        $replies = $this->getReplyManager()->findTopicReplies(
            $topic,
            $request->query->getInt('page', 1),
            null,
            Criteria::create()->where(Criteria::expr()->eq('enabled', true))
        );

        $reply = $this->getReplyManager()->createReply($topic, $this->getUser());
        $form = $this->createForm(TopicReplyType::class, $reply);

        //SEO
        $seoPage = $this->get('sonata.seo.page');
        $summary = StringManipulator::stripLineBreak($topic->getSummary());
        $seoPage
            ->setTitle($topic->getTitle())
            ->removeMeta('name', 'keywords')
            ->addMeta('name', 'description', $summary)
            ->addMeta('property', 'og:title', $topic->getTitle())
            ->addMeta('property', 'og:type', 'article')
            ->addMeta('property', 'og:url',  $this->generateUrl('topic_view', ['id' => $topic->getId()], UrlGeneratorInterface::ABSOLUTE_URL))
            ->addMeta('property', 'og:description', $summary);


        return $this->render('PHPDishWebBundle:Topic:view.html.twig', [
            'topic' => $topic,
            'replies' => $replies,
            'form' => $form->createView(),
        ]);
    }

    /**
     * 修改话题.
     *
     * @Route("/topics/{id}/edit", name="topic_edit", requirements={"id": "\d+"})
     *
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($id, Request $request)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $topic);

        $form = $this->createForm(TopicType::class, $topic);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getTopicManager()->saveTopic($topic);

            return $this->redirectToRoute('topic_view', [
                'id' => $topic->getId(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Topic:create.html.twig', [
            'form' => $form->createView(),
            'topic' => $topic,
        ]);
    }

    /**
     * 删除话题.
     *
     * @Route("/topics/{id}", name="topic_delete", requirements={"id": "\d+"})
     * @Method("DELETE")
     *
     * @param int $id
     *
     * @return Response
     */
    public function deleteAction($id)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic || !$topic->isEnabled()) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $topic);

        $this->getTopicManager()->blockTopic($topic);

        return $this->handleView($this->view([
            'result' => true,
        ]));
    }

    /**
     * 回复话题
     * @Route("/topics/{id}/replies", name="topic_add_reply")
     * @Method("POST")
     *
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function replyTopicAction($id, Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $topic = $this->getTopicManager()->findTopicById($id);
        $reply = $this->getReplyManager()->createReply($topic, $this->getUser());
        $form = $this->createForm(TopicReplyType::class, $reply);
        $form->handleRequest($request);
        $view = $this->view()->setFormat('json');
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getReplyManager()->saveReply($reply);

            //触发事件
            $this->get('event_dispatcher')->dispatch(Events::TOPIC_REPLIED, new TopicRepliedEvent($topic, $reply));

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

    /**
     * 切换话题推荐状态
     *
     * @Route("/topics/{id}/toggle_recommend", name="topic_toggle_recommend", requirements={"id": "\d+"})
     *
     * @param int $id
     *
     * @return Response
     */
    public function toggleRecommendAction($id)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic || !$topic->isEnabled()) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('ROLE_ADMIN', $topic);
        $topic->setRecommended(!$topic->isRecommended());
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($topic);
        $manager->flush();

        return $this->handleView($this->view([
            'is_recommended' => $topic->isRecommended(),
        ]));
    }

    /**
     * 用户的帖子.
     *
     * @Route("/users/{username}/topics", name="user_topics")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function getUserTopicsAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $topics = $this->getTopicManager()->findUserTopics($user, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Topic:user_topics.html.twig', [
            'user' => $user,
            'topics' => $topics,
        ]);
    }

    /**
     * 今日热帖.
     *
     * @param int|null $limit
     *
     * @return Response
     */
    public function todayHotTopicsAction($limit = null)
    {
        $date = Carbon::today()->modify('-100 days');
        $topics = $this->getTopicManager()->findHotTopics($date, $limit ?: 10);

        return $this->render('PHPDishWebBundle:Topic:today_hot.html.twig', [
            'topics' => $topics,
        ]);
    }
}
