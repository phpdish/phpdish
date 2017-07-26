<?php
namespace PHPDish\Bundle\ForumBundle\Controller;

use PHPDish\Bundle\ForumBundle\Form\Type\TopicType;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
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
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->get('phpdish.manager.topic');
    }
}
