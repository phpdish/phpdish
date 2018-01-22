<?php

namespace PHPDish\Bundle\PostBundle\Service;

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

    public function findBook($slug)
    {
        $category = $this->categoryManager->findCategoryBySlug($slug);
        if (!$category) {
            throw new \InvalidArgumentException('The book is not exists');
        }
        return $category;
    }

    public function findUserBooks(UserInterface $user)
    {
        $qb = $this->categoryManager->createGetUserCategoriesQueryBuilder($user);
        return $qb->getQuery()->getResult();
    }

    public function findChapter($id)
    {
        return $this->postManager->findPostById($id);
    }
}