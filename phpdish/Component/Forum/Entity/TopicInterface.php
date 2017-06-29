<?php
/**
 * PHPDish forum component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Forum\Entity;

interface TopicInterface
{
    /**
     * 获取创建时间
     * @return string
     */
    public function getCreatedAt();

    /**
     * 获取更新时间
     * @return string
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