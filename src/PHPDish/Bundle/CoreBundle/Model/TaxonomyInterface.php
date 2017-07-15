<?php
namespace PHPDish\Bundle\CoreBundle\Model;

use DateTime;

interface TaxonomyInterface extends DateTimeInterface
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
}