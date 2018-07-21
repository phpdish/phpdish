<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Forum\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PHPDish\Component\Cms\Model\AbstractPost;
use PHPDish\Component\Resource\Model\IdentifiableTrait;

class Topic extends AbstractPost implements TopicInterface
{
    use IdentifiableTrait;

    /**
     * @var ThreadInterface[]|Collection
     */
    protected $threads;

    /**
     * @var boolean
     */
    protected $recommended = false;

    /**
     * @var boolean
     */
    protected $isTop = false;

    public function __construct()
    {
        $this->threads = new ArrayCollection();
        $this->voters = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function getThreads()
    {
        return $this->threads;
    }

    /**
     * {@inheritdoc}
     */
    public function setThreads($threads)
    {
        $this->threads = $threads;

        return $this;
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
    public function setRecommended($recommended)
    {
        $this->recommended = $recommended;
    }

    /**
     * {@inheritdoc}
     */
    public function recommend()
    {
        $this->recommended = true;
    }

    /**
     * {@inheritdoc}
     */
    public function isTop()
    {
        return $this->isTop;
    }

    /**
     * {@inheritdoc}
     */
    public function setTop($isTop)
    {
        $this->isTop = $isTop;
    }


    /**
     * {@inheritdoc}
     */
    public function stickTop()
    {
        $this->isTop = true;
        return $this;
    }
}
