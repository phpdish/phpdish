<?php
/**
 * PHPDish forum component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

interface TopicInterface
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