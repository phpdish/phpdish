<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use Carbon\Carbon;
use PHPDish\Bundle\PostBundle\Controller\ManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    use ManagerTrait;

    use \PHPDish\Bundle\ForumBundle\Controller\ManagerTrait;

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $postManager = $this->getPostManager();
        $posts = $postManager->findLatestPosts($request->query->getInt('page', 1));
        $topics = $this->getTopicManager()->findHotTopics(Carbon::now()->addDays(-7), 15);
        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'posts' => $posts,
            'topics' => $topics
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {

    }
}
