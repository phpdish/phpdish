<?php

namespace PHPDish\Bundle\ForumBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ThreadController extends Controller
{
    use ManagerTrait;

    /**
     * @Route("/thread/{slug}", name="thread_view")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $thread = $this->getThreadManager()->findThreadBySlug($slug);
        $thread || $this->createNotFoundException();

        $criteria = Criteria::create();
        $criteria->orderBy(['repliedAt' => 'desc'])
            ->where(Criteria::expr()->eq('enabled', true))
            ->andWhere(Criteria::expr()->eq('thread', $thread));

        $tab = $request->query->get('tab');
        if ($tab && $tab === 'recommend') {
            $criteria->andWhere(Criteria::expr()->eq('recommended', true));
        }

        $topics = $this->getTopicManager()->findTopics($criteria, $request->query->getInt('page', 1));


        //SEO
        $seoPage = $this->get('sonata.seo.page');
        $seoPage
            ->setTitle($thread->getName())
            ->removeMeta('name', 'keywords')
            ->addMeta('name', 'description', $thread->getDescription())
            ->addMeta('property', 'og:title', $thread->getName())
            ->addMeta('property', 'og:url',  $this->generateUrl('thread_view', ['slug' => $thread->getSlug()], UrlGeneratorInterface::ABSOLUTE_URL))
            ->addMeta('property', 'og:description', $thread->getDescription());

        return $this->render('PHPDishWebBundle:Thread:view.html.twig', [
            'thread' => $thread,
            'topics' => $topics,
        ]);
    }
}
