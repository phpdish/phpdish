<?php

namespace PHPDish\Bundle\PostBundle\Controller;

use PHPDish\Bundle\CoreBundle\Controller\RestController;
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
     * @Route("/books/{slug}/chapter/{chapterId}", name="book_chapter_view", requirements={"slug": "[\w-]+", "chapterId": "\d+"})
     * @param string $slug
     * @param int $chapterId
     * @param Request $request
     * @return Response
     */
    public function viewCharacterAction($slug, $chapterId, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $character = $this->getBookManager()->findChapter($chapterId);
        return $this->render('PHPDishWebBundle:Book:read.html.twig', [
            'book' => $book,
            'character' => $character
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
     * @Route("/books/{slug}/chapters", name="book_add_chapter")
     * @Method("POST")
     * @param string  $slug
     * @param Request $request
     *
     * @return Response
     */
    public function addChapterAction($slug, Request $request)
    {
        $book = $this->getBookManager()->findBook($slug);
        $chapter = $this->getBookManager()->addBookChapter($book, $request->request->get('title'));
        return $this->handleView($this->view([
            'chapter' => $chapter
        ]));
    }
}
