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

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\ForumBundle\Form\Type\ThreadType;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ThreadController extends ResourceController
{
    use ManagerTrait;

    /**
     * 自动完成获取数据
     * @Route("/threads/autocomplete", name="thread_autocomplete")
     * @param Request $request
     * @return Response
     */
    public function autoCompleteAction(Request $request)
    {
        $query = $request->query->get('query');
        $threads = $this->getThreadManager()->searchThreads($query);
        return $this->json([
            'threads' => $threads
        ]);
    }

    /**
     * 热点threads （tag）
     * @return Response
     */
    public function hotThreadsAction()
    {
        $threads = $this->getThreadManager()->findEnabledThreads(15);
        return $this->render($this->configuration->getTemplate('Thread:_hot_threads.html.twig'), [
            'threads' => $threads
        ]);
    }

    /**
     * threads 探索
     *
     * @Route("/threads", name="threads")
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $criteria =  Criteria::create()->where(Criteria::expr()->eq('enabled', true))
            ->orderBy([
                'followerCount' => 'desc',
                'createdAt' => 'desc',
            ]);
        if ($request->query->get('tab') === 'following') {
            $threads = $this->getThreadManager()->findUserFollowingThreads(
                $this->getUser(),
                $request->query->getInt('page', 1),
                null,
                $criteria
            );
        } else {
            $threads = $this->getThreadManager()->findThreadsPager($criteria,
                $request->query->getInt('page', 1)
            );
        }

        $translator = $this->get('translator');
        $seoPage = $this->get('sonata.seo.page');
        $seoPage
            ->setTitle($translator->trans('thread.explore'))
            ->removeMeta('name', 'keywords')
            ->addMeta('name', 'description', $translator->trans('thread.explore'))
            ->addMeta('property', 'og:title', $translator->trans('thread.explore'))
            ->addMeta('property', 'og:url',  $this->generateUrl('threads', [],UrlGeneratorInterface::ABSOLUTE_URL))
            ->addMeta('property', 'og:description', $translator->trans('thread.explore'));

        return $this->render($this->configuration->getTemplate('Thread:index.html.twig'), [
            'threads' => $threads
        ]);
    }

    /**
     * @Route("/threads/{slug}", name="thread_view")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        if (!$thread) {
            throw $this->createNotFoundException();
        }

        $criteria = Criteria::create();
        $criteria->orderBy(['lastCommentAt' => 'desc'])
            ->where(Criteria::expr()->eq('enabled', true));

        $tab = $request->query->get('tab');
        if ($tab && $tab === 'recommend') {
            $criteria->andWhere(Criteria::expr()->eq('recommended', true));
        }

        $topics = $this->getTopicManager()->findThreadTopics($thread, $request->query->getInt('page', 1), null, $criteria);


        //SEO
        $seoPage = $this->get('sonata.seo.page');
        $seoPage
            ->setTitle($thread->getName())
            ->removeMeta('name', 'keywords')
            ->addMeta('name', 'description', $thread->getDescription())
            ->addMeta('property', 'og:title', $thread->getName())
            ->addMeta('property', 'og:url',  $this->generateUrl('thread_view', ['slug' => $thread->getSlug()], UrlGeneratorInterface::ABSOLUTE_URL))
            ->addMeta('property', 'og:description', $thread->getDescription());

        return $this->render($this->configuration->getTemplate('Thread:view.html.twig'), [
            'thread' => $thread,
            'topics' => $topics,
        ]);
    }

    /**
     * @Route("/threads/{slug}/edit", name="thread_edit")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($slug, Request $request)
    {
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        if (!$thread) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $thread);

        $form = $this->createForm(ThreadType::class, $thread);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {

            $this->getThreadManager()->saveThread($thread);
            $this->addFlash('success', $this->get('translator')->trans('thread.edit_success'));

            return $this->redirectToRoute('thread_view', [
                'slug' => $thread->getSlug(),
            ]);
        }
        return $this->render($this->configuration->getTemplate('Thread:create.html.twig'), [
            'thread' => $thread,
            'form' => $form->createView()
        ]);
    }

    /**
     * 关注节点.
     *
     * @Route("/threads/{slug}/followers", name="thread_follow")
     * @Method("POST")
     *
     * @param string $slug
     *
     * @return Response
     */
    public function followAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        $this->getThreadManager()->followThread($thread, $this->getUser());
        return $this->json([
            'follower_count' => $thread->getFollowerCount(),
        ]);
    }

    /**
     * 取消关注节点.
     *
     * @Route("/threads/{slug}/followers", name="thread_unfollow")
     * @Method("DELETE")
     *
     * @param string $slug
     *
     * @return Response
     */
    public function unFollowAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        $this->getThreadManager()->unFollowThread($thread, $this->getUser());
        return $this->json([
            'follower_count' => $thread->getFollowerCount(),
        ]);
    }
}
