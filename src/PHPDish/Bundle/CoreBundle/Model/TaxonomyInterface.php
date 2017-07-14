<?php
namespace PHPDish\Bundle\CoreBundle\Model;

use DateTime;

interface TaxonomyInterface
{
    /**
     * 获取id
     * @return integer
     */
    public function getId();

    /**
     * 设置分类名称
     * @param string $name
     * @return TaxonomyInterface
     */
    public function setName($name);

    /**
     * 获取分类
     * @return string
     */
    public function getName();

    /**
     * 设置slug
     * @param string $slug
     * @return TaxonomyInterface
     */
    public function setSlug($slug);

    /**
     * 获取slug
     * @return string
     */
    public function getSlug();

    /**
     * 设置描述
     * @param string $description
     * @return TaxonomyInterface
     */
    public function setDescription($description);

    /**
     * 获取描述
     * @return string
     */
    public function getDescription();

    /**
     * 设置创建时间
     * @param DateTime $createdAt
     * @return TaxonomyInterface
     */
    public function setCreatedAt(DateTime $createdAt);

    /**
     * 获取创建时间
     * @return DateTime
     */
    public function getCreatedAt();

    /**
     * 设置创建时间
     * @param DateTime $updatedAt
     * @return TaxonomyInterface
     */
    public function setUpdatedAt(DateTime $updatedAt);

    /**
     * 获取更新时间
     * @return DateTime
     */
    public function getUpdatedAt();
}