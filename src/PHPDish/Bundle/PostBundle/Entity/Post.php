<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\Common\Collections\Criteria;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\TreeTrait;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\CoreBundle\Utility;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\ChapterInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Algolia\AlgoliaSearchBundle\Mapping\Annotation as Algolia;

class Post implements ChapterInterface
{
    use IdentifiableTrait,
        ContentTrait,
        UserAwareTrait,
        DateTimeTrait,
        VotableTrait,
        TreeTrait,
        EnabledTrait;

    /**
     * @Algolia\Attribute
     */
    protected $title;

    /**
     * @var string
     */
    protected $cover;

    /**
     * @var bool
     */
    protected $recommended = false;

    /**
     * @var int
     */
    protected $commentCount = 0;

    /**
     * @var int
     */
    protected $viewCount = 0;

    /**
     * @var CategoryInterface
     */
    protected $category;

    /**
     * 文章插图.
     * @var array
     */
    protected $images;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->children = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getTitle();
    }

    /**
     * {@inheritdoc}
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * {@inheritdoc}
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * {@inheritdoc}
     */
    public function setCover($cover)
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * {@inheritdoc}
     */
    public function setViewCount($viewCount)
    {
        $this->viewCount = $viewCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getViewCount()
    {
        return $this->viewCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }

    /**
     * {@inheritdoc}
     */
    public function increaseCommentCount($count = 1)
    {
        $this->commentCount += $count;
    }

    /**
     * Gets the summary of the post.
     *
     * @return string
     *
     * @Algolia\Attribute
     */
    public function getSummary()
    {
        return strip_tags(mb_substr($this->body, 0, 250));
    }

    /**
     * {@inheritdoc}
     */
    public function setRecommend($recommended)
    {
        $this->recommended = $recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function isRecommended()
    {
        return $this->recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function getWordCount()
    {
        return mb_strlen($this->getBody(), 'UTF-8');
    }

    /**
     * {@inheritdoc}
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * {@inheritdoc}
     */
    public function setCategory(CategoryInterface $category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getChildren()
    {
        return $this->children->matching(Criteria::create()->where(Criteria::expr()->eq('enabled', true)));
    }

    /**
     * 检查文章是否是属于指定用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isBelongsTo(UserInterface $user)
    {
        return $this->getUser() === $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getImages()
    {
        if (!is_null($this->images)) {
            return $this->images;
        }

        return $this->images = Utility::extractImagesFromMarkdown($this->getOriginalBody());
    }
}
