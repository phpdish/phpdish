<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace  PHPDish\Component\Post\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use PHPDish\Component\Cms\Model\AbstractPost;
use PHPDish\Component\Resource\Model\IdentifiableTrait;
use PHPDish\Component\Resource\Model\TreeTrait;

class Post extends AbstractPost implements ChapterInterface
{
    use IdentifiableTrait,
        TreeTrait;

    /**
     * @var string
     */
    protected $cover;

    /**
     * @var CategoryInterface
     */
    protected $category;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->children = new ArrayCollection();
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
}
