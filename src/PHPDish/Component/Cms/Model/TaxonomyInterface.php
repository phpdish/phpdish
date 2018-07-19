<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */


namespace PHPDish\Component\Cms\Model;

use PHPDish\Component\Resource\Model\DateTimeInterface;
use PHPDish\Component\Resource\Model\SlugifyInterface;

interface TaxonomyInterface extends DateTimeInterface, SlugifyInterface
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
}
