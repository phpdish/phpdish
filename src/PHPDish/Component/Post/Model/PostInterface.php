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

use PHPDish\Component\Content\Model\ContentInterface;
use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;
use PHPDish\Component\Resource\Model\VotableInterface;
use PHPDish\Component\User\Model\UserAwareInterface;

interface PostInterface extends IdentifiableInterface,
    ContentInterface, DateTimeInterface, UserAwareInterface, VotableInterface, EnabledInterface
{
    /**
     * 获取标题.
     *
     * @return string
     */
    public function getTitle();

    /**
     * 设置标题.
     *
     * @param string $title
     *
     * @return $this
     */
    public function setTitle($title);

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
     * 获取查看次数.
     *
     * @return int
     */
    public function getViewCount();

    /**
     * 设置查看次数.
     *
     * @param int $viewCount
     *
     * @return $this
     */
    public function setViewCount($viewCount);

    /**
     * 获取评论数量.
     *
     * @return int
     */
    public function getCommentCount();

    /**
     * 添加阅读数
     *
     * @param int $viewCount
     * @return $this
     */
    public function addViewCount($viewCount);

    /**
     * 设置评论数量.
     *
     * @param int $commentCount
     *
     * @return $this
     */
    public function setCommentCount($commentCount);

    /**
     * 自增评论数量.
     *
     * @param int $count
     *
     * @return $this
     */
    public function increaseCommentCount($count = 1);

    /**
     * 获取字数.
     *
     * @return int
     */
    public function getWordCount();

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
     * 获取摘要
     *
     * @return string
     */
    public function getSummary();

    /**
     * 提取文章中的图片.
     *
     * @return array
     */
    public function getImages();

    /**
     * 检查文章是否是属于指定用户.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isBelongsTo(UserInterface $user);
}
