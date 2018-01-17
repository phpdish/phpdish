<?php

namespace PHPDish\Bundle\PostBundle\Service;

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

    public function findCharacter($id)
    {
        return $this->postManager->findPostById($id);
    }
}