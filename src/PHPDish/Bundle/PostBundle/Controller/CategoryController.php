<?php
namespace PHPDish\Bundle\PostBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends RestController
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
        $criteria = Criteria::create()->where(Criteria::expr()->eq('category', $category->getId()));
        if ($request->query->get('orderby') === 'hot') {
            $criteria->orderBy([
                'viewCount' => 'desc',
                'createdAt' => 'desc'
            ]);
        } else {
            $criteria->orderBy([
                'createdAt' => 'desc'
            ]);
        }
        $posts = $this->getPostManager()->findPosts($criteria, $request->query->getInt('page', 1));
        return $this->render('PHPDishWebBundle:Category:view.html.twig', [
            'category' => $category,
            'posts' => $posts
        ]);
    }

    /**
     * 关注话题
     * @Route("/categories/{slug}/followers", name="category_follow")
     * @Method("POST")
     * @param string $slug
     * @return Response
     */
    public function followAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $this->getCategoryManager()->followCategory($category, $this->getUser());
        $view = $this->view([
            'follower_count' => $category->getFollowerCount()
        ]);
        return $this->handleView($view);
    }

    /**
     * 取消关注话题
     * @Route("/categories/{slug}/followers", name="category_unfollow")
     * @Method("DELETE")
     * @param string $slug
     * @return Response
     */
    public function unFollowAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $this->getCategoryManager()->unFollowCategory($category, $this->getUser());
        $view = $this->view([
            'follower_count' => $category->getFollowerCount()
        ]);
        return $this->handleView($view);
    }

    public function userCategoriesAction()
    {

    }
}
