<?php
namespace PHPDish\Bundle\CoreBundle\Model;

interface TaxonomyInterface
{
    /**
     * 获取创建时间
     * @return \DateTime
     */
    public function getCreatedAt();

    /**
     * 获取更新时间
     * @return \DateTime
     */
    public function getUpdatedAt();

    /**
     * 获取话题的描述
     * @return string
     */
    public function getDescription();

    /**
     * 获取问题的数量
     * @return int
     */
    public function getQuestionCount();
}