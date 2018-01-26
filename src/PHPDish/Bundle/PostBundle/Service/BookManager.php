<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use PHPDish\Bundle\PostBundle\Model\BookInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class BookManager implements BookManagerInterface
{
    /**
     * @var PostManagerInterface
     */
    protected $postManager;

    /**
     * @var CategoryManagerInterface
     */
    protected $categoryManager;

    public function __construct(PostManagerInterface $postManager, CategoryManagerInterface $categoryManager)
    {
        $this->postManager = $postManager;
        $this->categoryManager = $categoryManager;
    }

    /**
     * {@inheritdoc}
     */
    public function findBook($slug)
    {
        $category = $this->categoryManager->findCategoryBySlug($slug);
        if (!$category || !$category->isBook()) {
            throw new \InvalidArgumentException('The book is not exists');
        }
        return $category;
    }

    /**
     * {@inheritdoc}
     */
    public function findUserBooks(UserInterface $user)
    {
        $qb = $this->createGetUserBooksQueryBuilder($user);
        return $qb->getQuery()->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function getUserBookNumber(UserInterface $user)
    {
        $qb = $this->createGetUserBooksQueryBuilder($user);

        return (int)$qb->select($qb->expr()->count('c'))
            ->getQuery()
            ->getSingleScalarResult();
    }

    protected function createGetUserBooksQueryBuilder($user)
    {
        return $this->categoryManager->createGetUserCategoriesQueryBuilder($user)
            ->andWhere('c.isBook = :isBook')->setParameter('isBook', true);
    }

    /**
     * {@inheritdoc}
     */
    public function createBook(UserInterface $user)
    {
        $book = $this->categoryManager->createCategory($user);
        $book->asBook();
        return $book;
    }

    /**
     * {@inheritdoc}
     */
    public function saveBook(BookInterface $book)
    {
        $this->categoryManager->saveCategory($book);
    }

    /**
     * {@inheritdoc}
     */
    public function findChapter($id)
    {
        return $this->postManager->findPostById($id);
    }

    /**
     * {@inheritdoc}
     */
    public function addBookChapter(BookInterface $book, $chapter)
    {
        if (is_string($chapter)) {
            $title = $chapter;
            $chapter = $this->postManager->createPost($book->getCreator());
            $chapter->setTitle($title);
        }
        $chapter->setUpdatedAt(Carbon::now())
            ->setCategory($book);
        $this->postManager->savePost($chapter);
        return $chapter;
    }
}