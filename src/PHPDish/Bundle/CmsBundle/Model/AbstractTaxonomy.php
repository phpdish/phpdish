<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CmsBundle\Model;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\ResourceBundle\Model\DateTimeTrait;
use PHPDish\Bundle\ResourceBundle\Model\EnabledTrait;

abstract class AbstractTaxonomy implements TaxonomyInterface
{
    use DateTimeTrait, EnabledTrait;

    protected $name;

    protected $slug;

    protected $description;

    protected $postCount;

    /**
     * @var PostInterface[]|Collection
     */
    protected $posts;


    public function __toString()
    {
        return $this->getName();
    }

    /**
     * {@inheritdoc}
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritdoc}
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * {@inheritdoc}
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function setPostCount($count)
    {
        $this->postCount = $count;
    }

    /**
     * {@inheritdoc}
     */
    public function getPostCount()
    {
        return $this->postCount;
    }

    /**
     * {@inheritdoc}
     */
    public function addPostCount($count = 1)
    {
        $this->postCount += $count;
        $this->postCount = max($this->postCount, 0);
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * {@inheritdoc}
     */
    public function addPost(PostInterface $post)
    {
        $this->posts[] = $post;
    }
}
