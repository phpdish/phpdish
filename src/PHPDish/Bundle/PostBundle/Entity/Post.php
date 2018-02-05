<?php

namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\CoreBundle\Utility;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\ChapterInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Algolia\AlgoliaSearchBundle\Mapping\Annotation as Algolia;

/**
 * @ORM\Entity(repositoryClass="PHPDish\Bundle\PostBundle\Repository\PostRepository")
 * @ORM\Table(name="posts")
 * @ORM\HasLifecycleCallbacks
 * @ORM\AttributeOverrides({
 *     @ORM\AttributeOverride(name="body",
 *         column=@ORM\Column(
 *             type="text",
 *             nullable=true
 *         )
 *     ),
 *     @ORM\AttributeOverride(name="originalBody",
 *         column=@ORM\Column(
 *             type="text",
 *             nullable=true
 *         )
 *     )
 * })
 */
class Post implements PostInterface, ChapterInterface
{
    use IdentifiableTrait,
        ContentTrait,
        UserAwareTrait,
        DateTimeTrait,
        VotableTrait,
        EnabledTrait;

    /**
     * @ORM\Column(type="string", length=150)
     * @Algolia\Attribute
     */
    protected $title;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $cover;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $recommended = false;

    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $commentCount = 0;

    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $viewCount = 0;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="posts")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
    protected $category;

    /**
     * 子章节
     * @ORM\OneToMany(targetEntity="Post", mappedBy="parent")
     */
    protected $children;

    /**
     * 父章节
     * @ORM\ManyToOne(targetEntity="Post", inversedBy="children")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    protected $parent;

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
    public function getUser()
    {
        return $this->user;
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

    public function getChildren()
    {
        return $this->children->matching(Criteria::create()->where(Criteria::expr()->eq('enabled', true)));
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function setParent(ChapterInterface $chapter)
    {
        $this->parent = $chapter;
        return $this;
    }

    public function getNext()
    {
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
