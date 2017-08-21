<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\CommentableTrait;
use PHPDish\Bundle\CoreBundle\Model\ContentTrait;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\VotableTrait;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\PostBundle\Model\PostInterface;

/**
 * @ORM\Entity(repositoryClass="PHPDish\Bundle\PostBundle\Repository\PostRepository")
 * @ORM\Table(name="posts")
 * @ORM\HasLifecycleCallbacks
 */
class Post implements PostInterface
{
    use IdentifiableTrait,
        ContentTrait,
        UserAwareTrait,
        DateTimeTrait,
        VotableTrait,
        EnabledTrait;

    /**
     * @ORM\Column(type="string", length=150)
     */
    protected $title;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $cover;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $isRecommended = false;

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
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
    protected $category;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->votes = new ArrayCollection();
        $this->comments = new ArrayCollection();
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
        return true;
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
     * Gets the summary of the post
     * @return string
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
        $this->isRecommended = $recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function isRecommended()
    {
        return $this->isRecommended;
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

    /**
     * 构建图片背景
     * @param int $width
     * @param int $height
     * @return string
     */
    public function buildCover($width, $height)
    {
        return 'http://image.woshipm.com/wp-files/2017/08/COI8jra6kC9Ded4JeMEn.jpg!/both/202x145';
        return sprintf( '/thumbs/%dx%d/%s', $width, $height, $this->getCover());
    }
}
