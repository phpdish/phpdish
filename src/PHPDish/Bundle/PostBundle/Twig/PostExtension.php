<?php

declare(strict_types=1);

namespace PHPDish\Bundle\PostBundle\Twig;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Service\ReplyManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;
use PHPDish\Bundle\PostBundle\Service\CommentManagerInterface;
use PHPDish\Bundle\PostBundle\Service\PostManagerInterface;

class PostExtension extends \Twig_Extension
{
    /**
     * @var CategoryManagerInterface
     */
    protected $categoryManager;

    /**
     * @var PostManagerInterface
     */
    protected $postManager;

    /**
     * @var CommentManagerInterface
     */
    protected $commentManager;

    public function __construct(
        CategoryManagerInterface $categoryManager,
        PostManagerInterface $postManager,
        CommentManagerInterface $commentManager
    )
    {
        $this->categoryManager = $categoryManager;
        $this->postManager = $postManager;
        $this->commentManager = $commentManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions(): array
    {
        return [
            new \Twig_SimpleFunction('get_category', [$this->categoryManager, 'findCategoryById']),
            new \Twig_SimpleFunction('get_category_by_slug', [$this->categoryManager, 'findCategoryBySlug']),
            new \Twig_SimpleFunction('get_categories', [$this, 'getCategories']),
            new \Twig_SimpleFunction('get_categories_pager', [$this->categoryManager, 'findCategoriesPager']),

            new \Twig_SimpleFunction('get_post', [$this->postManager, 'findPostById']),
            new \Twig_SimpleFunction('get_posts', [$this, 'getPosts']),
            new \Twig_SimpleFunction('get_posts_pager', [$this->postManager, 'findPostsPager']),

            new \Twig_SimpleFunction('get_comment', [$this->commentManager, 'findCommentById']),
            new \Twig_SimpleFunction('get_comments', [$this, 'getComments']),
            new \Twig_SimpleFunction('get_comments_pager', [$this->commentManager, 'findCommentsPager']),
        ];
    }

    /**
     * 指定条件查找专栏
     *
     * @param array| $criteria
     * @param array $orderBy
     * @param int $limit
     * @return array
     */
    public function getCategories($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->categoryManager->findCategories($criteria);
        } else {
            return $this->categoryManager->getCategoryRepository()->findBy($criteria, $orderBy, $limit);
        }
    }

    /**
     * 指定条件查找post
     *
     * @param array| $criteria
     * @param array $orderBy
     * @param int $limit
     * @return array
     */
    public function getPosts($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->postManager->findPosts($criteria);
        } else {
            return $this->postManager->getPostRepository()->findBy($criteria, $orderBy, $limit);
        }
    }

    /**
     * 查找评论
     *
     * @param array|Criteria $criteria
     * @param array $orderBy
     * @param int|null $limit
     * @return CommentInterface[]|Collection
     */
    public function getComments($criteria, array $orderBy = [], ?int $limit = null)
    {
        if ($criteria instanceof Criteria) {
            return $this->commentManager->findComments($criteria);
        } else {
            return $this->commentManager->getCommentRepository()->findBy($criteria, $orderBy, $limit);
        }
    }
}