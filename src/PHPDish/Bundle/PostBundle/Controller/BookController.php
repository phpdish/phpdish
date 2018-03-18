<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use FOS\RestBundle\Context\Context;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Form\Type\BookType;
use PHPDish\Bundle\PostBundle\Form\Type\ChapterType;
use PHPDish\Component\Util\StringManipulator;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class BookController extends RestController
{
    use ManagerTrait;

    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;

    /**
     * 创建电子书
     *
     * @Route("/books/new", name="book_add")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getBookManager();

        $book = $manager->createBook($this->getUser());
        $form = $this->createForm(BookType::class, $book);
        $form->handleRequest($request);

        if (($number = $manager->getUserBookNumber($this->getUser())) >= 5) {
            $this->addFlash('danger', sprintf('最多只能创建五本书，你现在已经拥有%d个', $number));
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->saveBook($book);
            $this->addFlash('success', '电子书创建成功');

            return $this->redirectToRoute('book_view', [
                'slug' => $book->getSlug(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Category:create.html.twig', [
            'form' => $form->createView(),
            'hasManyCategories' => $number >= 5,
            'isBook' => true
        ]);
    }

    /**
     * 查看电子书
     *
     * @Route("/books/{slug}", name="book_view", requirements={"slug": "[\w-]+"})
     * @param string $slug
     * @param Request $request
     * @return Response
     */
    public function viewAction($slug, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        return $this->render('PHPDishWebBundle:Book:view.html.twig', [
            'book' => $book,
        ]);
    }

    /**
     * 编辑电子书信息.
     *
     * @Route("/books/{slug}/edit", name="book_edit")
     *
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($slug, Request $request)
    {
        $manager = $this->getBookManager();
        $book = $manager->findBook($slug);
        if (!$book) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('edit', $book);
        $form = $this->createForm(BookType::class, $book);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {
            $manager->saveBook($book);
            $this->addFlash('success', '电子书修改成功');

            return $this->redirectToRoute('book_view', [
                'slug' => $book->getSlug(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Category:create.html.twig', [
            'form' => $form->createView(),
            'category' => $book,
            'hasManyCategories' => false,
            'isBook' => true
        ]);
    }

    /**
     * 查看电子书目录
     *
     * @Route("/books/{slug}/summary", name="book_summary")
     * @Method("GET")
     * @param string $slug
     * @return Response
     */
    public function getSummaryAction($slug)
    {
        $book = $this->getBookManager()->findBook($slug);
        $chaptersTree = $this->getBookManager()->findBookChaptersTree($book);

        return $this->render('PHPDishWebBundle:Book:summary.html.twig', [
            'book' => $book,
            'chaptersTree' => $chaptersTree
        ]);
    }

    /**
     * 专栏的关注者.
     *
     * @Route("/books/{slug}/followers", name="book_followers")
     * @Method("GET")
     *
     * @param string $slug
     * @param Request $request
     *
     * @return Response
     */
    public function getFollowersAction($slug, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $users = $this->getUserManager()->findCategoryFollowers($book, $request->query->getInt('page', 1));

        return $this->render('PHPDishWebBundle:Book:followers.html.twig', [
            'book' => $book,
            'users' => $users,
        ]);
    }

    /**
     * 查看电子书具体章节
     *
     * @Route("/books/{slug}/chapters/{chapterId}", name="book_read", requirements={"slug": "[\w-]+", "chapterId": "\d+"})
     * @param string $slug
     * @param int $chapterId
     * @param Request $request
     * @return Response
     */
    public function viewChapterAction($slug, $chapterId, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $chapter = $this->getBookManager()->findChapter($chapterId);
        $chaptersTree = $this->getBookManager()->findBookChaptersTree($book);

        //更新阅读数
        $this->getPostManager()->increasePostViews($chapter);

        //SEO
        $seoPage = $this->get('sonata.seo.page');
        $summary = StringManipulator::stripLineBreak($chapter->getSummary());
        $seoPage
            ->setTitle($chapter->getTitle())
            ->removeMeta('name', 'keywords')
            ->addMeta('name', 'description', $summary)
            ->addMeta('property', 'og:title', $chapter->getTitle())
            ->addMeta('property', 'og:type', 'article')
            ->addMeta('property', 'og:url',  $this->generateUrl('book_read', ['slug' => $slug, 'chapterId' => $chapter->getId()], UrlGeneratorInterface::ABSOLUTE_URL))
            ->addMeta('property', 'og:description', $summary);

        return $this->render('PHPDishWebBundle:Book:read.html.twig', [
            'book' => $book,
            'chapter' => $chapter,
            'chaptersTree' => $chaptersTree
        ]);
    }

    /**
     * 查看用户的电子书
     *
     * @Route("/users/{username}/books", name="user_books")
     *
     * @param string  $username
     * @param Request $request
     *
     * @return Response
     */
    public function getUserBooksAction($username, Request $request)
    {
        $user = $this->getUserManager()->findUserByName($username);
        $books = $this->getBookManager()->findUserBooks($user);
        return $this->render('PHPDishWebBundle:Book:user_books.html.twig', [
            'user' => $user,
            'books' => $books
        ]);
    }

    /**
     * 添加目录
     *
     * @Route("/books/{slug}/summary", name="book_add_summary")
     * @Method("POST")
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function addSummaryAction($slug, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $this->denyAccessUnlessGranted('edit', $book);
        $chapter = $this->getBookManager()->addBookChapter($book, $request->request->get('title'));
        return $this->handleView($this->view([
            'chapter' => $chapter
        ])->setContext((new Context())->setGroups(['Default'])));
    }

    /**
     * 修改目录
     *
     * @Route("/books/{slug}/summary/{id}/edit", name="book_edit_summary")
     * @Method("POST")
     * @param string  $slug
     * @param int  $id
     * @param Request $request
     *
     * @return Response
     */
    public function editSummaryAction($slug, $id, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $this->denyAccessUnlessGranted('edit', $book);
        $chapter = $this->getBookManager()->findChapter($id);
        $chapter->setTitle($request->request->get('title'));
        $this->getPostManager()->savePost($chapter);
        return $this->handleView($this->view([
            'chapter' => $chapter
        ])->setContext((new Context())->setGroups(['Default'])));
    }

    /**
     * 添加章节
     *
     * @Route("/books/{slug}/chapters/new", name="book_add_chapter")
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function addChapterAction($slug, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $this->denyAccessUnlessGranted('edit', $book);

        //创建from
        $chapter = $this->getPostManager()->createPost($this->getUser());
        $chapter->setCategory($book);
        $defaultChapter = null;
        if ($defaultChapterId = $request->query->get('summary')) {
            $defaultChapter = $this->getBookManager()->findChapter($defaultChapterId);
        }
        $form = $this->createForm(ChapterType::class, $chapter, [
            'book' => $book,
            'default_character' => $defaultChapter
        ]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            if ($this->getPostManager()->savePost($chapter)) {
                $this->addFlash('success', '章节创建成功');
                return $this->redirectToRoute('book_summary', [
                    'slug' => $slug
                ]);
            } else {
                $this->addFlash('error', '章节创建失败');
            }
        }
        return $this->render('PHPDishWebBundle:Book:create_chapter.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * 修改章节
     *
     * @Route("/books/{slug}/chapters/{id}/edit", name="book_edit_chapter")
     * @param string  $slug
     * @param int $id
     * @param Request $request
     *
     * @return Response
     */
    public function editChapterAction($slug, $id, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $this->denyAccessUnlessGranted('edit', $book);

        //创建from
        $chapter = $this->getBookManager()->findChapter($id);
        $form = $this->createForm(ChapterType::class, $chapter, [
            'book' => $book,
        ]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            if ($this->getPostManager()->savePost($chapter)) {
                $this->addFlash('success', '章节修改成功');
                return $this->redirectToRoute('book_summary', [
                    'slug' => $slug
                ]);
            } else {
                $this->addFlash('error', '章节修改失败');
            }
        }
        return $this->render('PHPDishWebBundle:Book:create_chapter.html.twig', [
            'form' => $form->createView(),
            'chapter' => $chapter
        ]);
    }

    /**
     * 移动章节
     *
     * @Route("/books/{slug}/chapters/{id}/move", name="book_move_chapter")
     * @param string $slug
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function moveChapterAction($slug, $id, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $this->denyAccessUnlessGranted('edit', $book);
        $chapter = $this->getBookManager()->findChapter($id);
        $this->getBookManager()->moveBookChapter($book, $chapter,
            $request->request->get('direction'),
            $request->request->get('step')
        );
        return $this->handleView($this->view([
            'chapter' => $chapter
        ])->setContext((new Context())->setGroups(['Default'])));
    }
}
