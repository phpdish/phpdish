<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PostBundle\Form\Type\ChapterType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class BookController extends RestController
{
    use ManagerTrait;

    use \PHPDish\Bundle\UserBundle\Controller\ManagerTrait;

    /**
     * 查看书籍
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
     * 查看书籍目录
     *
     * @Route("/books/{slug}/summary", name="book_summary")
     * @Method("GET")
     * @param string $slug
     * @return Response
     */
    public function getSummaryAction($slug)
    {
        $book = $this->getBookManager()->findBook($slug);
        return $this->render('PHPDishWebBundle:Book:summary.html.twig', [
            'book' => $book,
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
     * 查看书籍具体章节
     *
     * @Route("/books/{slug}/chapter/{chapterId}", name="book_read", requirements={"slug": "[\w-]+", "chapterId": "\d+"})
     * @param string $slug
     * @param int $chapterId
     * @param Request $request
     * @return Response
     */
    public function viewChapterAction($slug, $chapterId, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $chapter = $this->getBookManager()->findChapter($chapterId);
        return $this->render('PHPDishWebBundle:Book:read.html.twig', [
            'book' => $book,
            'chapter' => $chapter
        ]);
    }

    /**
     * 查看用户的书籍
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
        dump($books);
        return $this->render('PHPDishWebBundle:Book:user_books.html.twig', [
            'user' => $user,
            'books' => $books
        ]);
    }

    /**
     * 添加章节
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
        $chapter = $this->getBookManager()->addBookChapter($book, $request->request->get('title'));
        return $this->handleView($this->view([
            'chapter' => $chapter
        ]));
    }

    /**
     * 添加章节
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
        $chapter = $this->getBookManager()->findChapter($id);
        $chapter->setTitle($request->request->get('title'));
        $this->getPostManager()->savePost($chapter);
        return $this->handleView($this->view([
            'chapter' => $chapter
        ]));
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
                return $this->redirectToRoute('book_view', [
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
     * 添加章节
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
                return $this->redirectToRoute('book_view', [
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
}
