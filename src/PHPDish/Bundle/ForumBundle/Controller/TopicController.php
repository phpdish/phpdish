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

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CmsBundle\Utility\StringManipulator;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use PHPDish\Bundle\ForumBundle\Event\Events;
use PHPDish\Bundle\ForumBundle\Event\ReplyTopicEvent;
use PHPDish\Bundle\ForumBundle\Event\TopicEvent;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicReplyType;
use PHPDish\Bundle\ForumBundle\Form\Type\TopicType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class TopicController extends ResourceController
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
        $criteria->orderBy(['isTop' => 'desc',  'lastCommentAt' => 'desc'])->where(Criteria::expr()->eq('enabled', true));

        $tab = $request->query->get('tab');
        if ($tab === 'following') {
            $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED'); //关注的需要登录
            $topics = $manager->findFollowingThreadsTopics($this->getUser(), $request->query->getInt('page', 1));
        } else {
            if ($tab === 'recommend') {
                $criteria->andWhere(Criteria::expr()->eq('recommended', true));
            }
            $topics = $manager->findTopicsPager($criteria, $request->query->getInt('page', 1));
        }
//        return $this->render('@PHPDishWeb/Topic/index.html.twig', [
//            'topics' => $topics,
//        ]);
        return $this->render($this->configuration->getTemplate('Topic:index.html.twig'), [
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
            //触发事件
            $this->get('event_dispatcher')->dispatch(Events::TOPIC_CREATED, new TopicEvent($topic));

            return $this->redirectToRoute('topic_view', [
                'id' => $topic->getId(),
            ]);
        }

        return $this->render($this->configuration->getTemplate('Topic:create.html.twig'), [
            'form' => $form->createView(),
            'threads' => $this->getThreadManager()->findEnabledThreads(10)
        ]);
    }

    /**
     * 查看话题.
     *
     * @Route("/topics/{id}", name="topic_view", requirements={"id": "\d+"}, methods={"GET"})
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
            $request->query->getInt('page', 1)
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

        return $this->render($this->configuration->getTemplate('Topic:view.html.twig'), [
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

        return $this->render($this->configuration->getTemplate('Topic:create.html.twig'), [
            'form' => $form->createView(),
            'topic' => $topic,
            'threads' => $this->getThreadManager()->findEnabledThreads(10)
        ]);
    }

    /**
     * 删除话题.
     *
     * @Route("/topics/{id}", name="topic_delete", requirements={"id": "\d+"}, methods={"DELETE"})
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
     *
     * @Route("/topics/{id}/replies", name="topic_add_reply", methods={"POST"})
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
            $this->get('event_dispatcher')->dispatch(Events::TOPIC_REPLIED, new ReplyTopicEvent($topic, $reply));

            $view->setData(['reply' => $reply])
                ->getContext()
                ->setGroups(['Default']);
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
     * 切换置顶状态
     *
     * @Route("/topics/{id}/toggle_top", name="topic_toggle_top", requirements={"id": "\d+"})
     *
     * @param int $id
     *
     * @return Response
     */
    public function toggleTopAction($id)
    {
        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic || !$topic->isEnabled()) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('ROLE_ADMIN', $topic);
        $topic->setTop(!$topic->isTop());
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($topic);
        $manager->flush();

        return $this->handleView($this->view([
            'is_top' => $topic->isTop(),
        ]));
    }

    /**
     * 切换点赞状态
     *
     * @Route("/topics/{id}/voters", name="topic_toggle_voter", methods={"POST"})
     */
    public function toggleVoterAction($id)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $topic = $this->getTopicManager()->findTopicById($id);
        if (!$topic) {
            throw new \InvalidArgumentException($this->get('translator')->trans('topic.not_exists'));
        }
        if ($isVoted = $topic->isVotedBy($this->getUser())) {
            $this->getTopicManager()->removeVoter($topic, $this->getUser());
        } else {
            $this->getTopicManager()->addVoter($topic, $this->getUser());
        }
        return $this->json([
            'vote_count' => $topic->getVoteCount(),
            'is_voted' => !$isVoted
        ]);
    }

    /**
     * 用户的帖子.
     * @Route("/users/{username}", name="user_view")
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

        return $this->render($this->configuration->getTemplate('Topic:user_topics.html.twig'), [
            'user' => $user,
            'topics' => $topics,
        ]);
    }

    /**
     * 今日热帖.
     * @param int|null $limit
     *
     * @return Response
     */
    public function todayHotTopicsAction($limit = null)
    {
        $date = Carbon::today()->modify('-100 days');
        $topics = $this->getTopicManager()->findHotTopics($date, $limit ?: 10);

        return $this->render($this->configuration->getTemplate('Topic:_today_hot.html.twig'), [
            'topics' => $topics,
        ]);
    }
}
