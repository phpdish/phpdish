<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use PHPDish\Bundle\PostBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $postManager = $this->get('phpdish.manager.post');
        $posts = $postManager->findLatestPosts($request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'posts' => $posts
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {

    }
}
