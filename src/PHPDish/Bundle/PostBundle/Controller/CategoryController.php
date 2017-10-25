<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Form\Type\CategoryType;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends RestController
{
    use ManagerTrait;

    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;

    /**
     * @Route("/categories/new", name="category_add")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $manager = $this->getCategoryManager();

        $category = $manager->createCategory($this->getUser());
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if (($number = $manager->getUserCategoriesNumber($this->getUser())) >= 2) {
            $this->addFlash('danger', sprintf('最多只能创建两个专栏，你现在已经拥有%d个', $number));
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->saveCategory($category);
            $this->addFlash('notice', '专栏创建成功');

            return $this->redirectToRoute('category_view', [
                'slug' => $category->getSlug(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Category:create.html.twig', [
            'form' => $form->createView(),
            'hasManyCategories' => $number >= 2,
        ]);
    }

    /**
     * 专栏详情.
     *
     * @Route("/categories/{slug}", name="category_view")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $criteria = Criteria::create()->where(Criteria::expr()->eq('category', $category->getId()));
        if ($request->query->get('orderby') === 'hot') {
            $criteria->orderBy([
                'viewCount' => 'desc',
                'createdAt' => 'desc',
            ]);
        } else {
            $criteria->orderBy([
                'createdAt' => 'desc',
            ]);
        }
        $posts = $this->getPostManager()->findPosts($criteria, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Category:view.html.twig', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }

    /**
     * 编辑专栏信息.
     *
     * @Route("/categories/{slug}/edit", name="category_edit")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($slug, Request $request)
    {
        $manager = $this->getCategoryManager();
        $category = $manager->findCategoryBySlug($slug);
        if (!$category) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $category);
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {
            $manager->saveCategory($category);
            $this->addFlash('success', '专栏修改成功');

            return $this->redirectToRoute('category_view', [
                'slug' => $category->getSlug(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Category:create.html.twig', [
            'form' => $form->createView(),
            'category' => $category,
            'hasManyCategories' => false,
        ]);
    }

    /**
     * 专栏的关注者.
     *
     * @Route("/categories/{slug}/followers", name="category_followers")
     * @Method("GET")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function getFollowersAction($slug, Request $request)
    {
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $users = $this->getUserManager()->findCategoryFollowers($category, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Category:followers.html.twig', [
            'category' => $category,
            'users' => $users,
        ]);
    }

    /**
     * 关注话题.
     *
     * @Route("/categories/{slug}/followers", name="category_follow")
     * @Method("POST")
     *
     * @param string $slug
     *
     * @return Response
     */
    public function followAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $this->getCategoryManager()->followCategory($category, $this->getUser());
        $view = $this->view([
            'follower_count' => $category->getFollowerCount(),
        ]);

        return $this->handleView($view);
    }

    /**
     * 取消关注话题.
     *
     * @Route("/categories/{slug}/followers", name="category_unfollow")
     * @Method("DELETE")
     *
     * @param string $slug
     *
     * @return Response
     */
    public function unFollowAction($slug)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $category = $this->getCategoryManager()->findCategoryBySlug($slug);
        $this->getCategoryManager()->unFollowCategory($category, $this->getUser());
        $view = $this->view([
            'follower_count' => $category->getFollowerCount(),
        ]);

        return $this->handleView($view);
    }

    /**
     * 获取用户的专栏.
     *
     * @param UserInterface $user
     *
     * @return Response
     */
    public function userCategoriesAction(UserInterface $user)
    {
        $categories = $this->getCategoryManager()->findUserCategories($user);

        return $this->render('PHPDishWebBundle:Category:user_categories.html.twig', [
            'categories' => $categories,
            'user' => $user,
        ]);
    }
}
