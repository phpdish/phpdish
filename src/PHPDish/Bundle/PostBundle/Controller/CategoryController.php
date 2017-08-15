<?php
namespace PHPDish\Bundle\PostBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    use ManagerTrait;

    /**
     * @Route("/categories/{slug}", name="category_view")
     * @param string $slug
     * @param Request $request
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $posts = $this->getPostManager()->findCategoryPosts($category, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Category:view.html.twig', [
            'category' => $category,
            'posts' => $posts
        ]);
    }
}
