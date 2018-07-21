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
use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\EnabledInterface;
use PHPDish\Component\Resource\Model\SlugifyInterface;

interface TaxonomyInterface extends DateTimeInterface, SlugifyInterface, EnabledInterface
{
    /**
     * 设置分类名称.
     *
     * @param string $name
     *
     * @return self
     */
    public function setName($name);

    /**
     * 获取分类.
     *
     * @return string
     */
    public function getName();

    /**
     * 设置描述.
     *
     * @param string $description
     *
     * @return self
     */
    public function setDescription($description);

    /**
     * 获取描述.
     *
     * @return string
     */
    public function getDescription();

    /**
     * 获取文档数量
     *
     * @return int
     */
    public function getPostCount();

    /**
     * 设置文档数量
     *
     * @param int $count
     * @return self
     */
    public function setPostCount($count);

    /**
     * 增加访问次数，允许为空
     *
     * @param int $count
     * @return self
     */
    public function addPostCount($count = 1);

    /**
     * 获取文档
     *
     * @return PostInterface[]|Collection
     */
    public function getPosts();

    /**
     * 添加文档
     *
     * @param PostInterface $post
     * @return self
     */
    public function addPost(PostInterface $post);
}
