<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\PostBundle\Model\BookInterface;
use PHPDish\Bundle\PostBundle\Model\ChapterInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface BookManagerInterface
{
    /**
     * 获取图书
     * @param string $slug
     * @return BookInterface
     */
    public function findBook($slug);

    /**
     * 查询用户书籍
     *
     * @param UserInterface $user
     * @return BookInterface[]|Collection
     */
    public function findUserBooks(UserInterface $user);

    /**
     * 获取章节
     * @param int $id
     * @return PostInterface
     */
    public function findChapter($id);

    /**
     * 创建书籍
     *
     * @param UserInterface $user 作者
     * @return BookInterface
     */
    public function createBook(UserInterface $user);

    /**
     * 保存书籍
     *
     * @param BookInterface $book
     */
    public function saveBook(BookInterface $book);

    /**
     * 给书籍添加章节
     *
     * @param BookInterface $book
     * @param ChapterInterface|string $chapter
     * @return ChapterInterface
     */
    public function addBookChapter(BookInterface $book, $chapter);

    /**
     * 获取用户的书籍数量
     *
     * @param UserInterface $user
     * @return int
     */
    public function getUserBookNumber(UserInterface $user);
}