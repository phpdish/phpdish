<?php

namespace PHPDish\Component\Content\Model;

interface TaxonomyInterface extends DateTimeInterface
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
     * 设置slug.
     *
     * @param string $slug
     *
     * @return self
     */
    public function setSlug($slug);

    /**
     * 获取slug.
     *
     * @return string
     */
    public function getSlug();

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
