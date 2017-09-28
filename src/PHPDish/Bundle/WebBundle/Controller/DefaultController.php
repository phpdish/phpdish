<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use Carbon\Carbon;
use Gaufrette\File;
use PHPDish\Bundle\PostBundle\Controller\ManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    use ManagerTrait;

    use \PHPDish\Bundle\ForumBundle\Controller\ManagerTrait;

    /**
     * 首页（暂时不启用）
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        $postManager = $this->getPostManager();
        $posts = $postManager->findLatestPosts($request->query->getInt('page', 1));
        $topics = $this->getTopicManager()->findHotTopics(Carbon::now()->addDays(-10), 15);
        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'posts' => $posts,
            'topics' => $topics
        ]);
    }

    /**
     * 关于我们
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {
    }
}
