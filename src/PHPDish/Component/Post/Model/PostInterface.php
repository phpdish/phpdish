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

use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\Cms\Model\PostInterface as BasePostInterface;

interface PostInterface extends IdentifiableInterface, BasePostInterface
{
    /**
     * 设置题图.
     *
     * @param string $cover
     *
     * @return $this
     */
    public function setCover($cover);

    /**
     * 获取题图.
     *
     * @return string
     */
    public function getCover();

    /**
     * 获取分类.
     *
     * @return CategoryInterface
     */
    public function getCategory();

    /**
     * 设置分类.
     *
     * @param CategoryInterface $category
     *
     * @return $this
     */
    public function setCategory(CategoryInterface $category);

    /**
     * 是否推荐.
     *
     * @return bool
     */
    public function isRecommended();
}
