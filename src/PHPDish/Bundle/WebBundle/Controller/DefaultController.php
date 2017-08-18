<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use PHPDish\Bundle\PostBundle\Controller\ManagerTrait;
use PHPDish\Bundle\PostBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    use ManagerTrait;

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $postManager = $this->getPostManager();
        $posts = $postManager->findLatestPosts($request->query->getInt('page', 1));
        $recommendedPosts = $postManager->findRecommendPosts(1, 5);
        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'posts' => $posts,
            'recommendedPosts' => $recommendedPosts
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {

    }
}
