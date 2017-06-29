<?php
/**
 * PHPDish forum component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

interface QuestionInterface extends VotableInterface, CommentableInterface
{
    /**
     * 获取标题
     * @return UserInterface
     */
    public function getTitle();

    /**
     * 获取问题内容
     * @return UserInterface
     */
    public function getContent();

    /**
     * 获取作者
     * @return UserInterface
     */
    public function getAuthor();
}