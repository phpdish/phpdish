<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\PostBundle\Model\BookInterface;
use PHPDish\Bundle\PostBundle\Model\ChapterInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface BookManagerInterface
{
    /**
     * 同级移动方向上
     *
     * @var string
     */
    const MOVE_DIRECTION_UP = 'up';

    /**
     * 同级移动方向，下
     * @var string
     */
    const MOVE_DIRECTION_DOWN = 'down';

    /**
     * 获取图书
     * @param string $slug
     * @return BookInterface
     */
    public function findBook($slug);

    /**
     * 查询用户电子书
     *
     * @param UserInterface $user
     * @return BookInterface[]|Collection
     */
    public function findUserBooks(UserInterface $user);

    /**
     * 获取章节
     * @param int $id
     * @return ChapterInterface
     */
    public function findChapter($id);

    /**
     * 获取电子书的章节树形结构
     *
     * @param BookInterface $book
     * @return array|ChapterInterface[]
     */
    public function findBookChaptersTree(BookInterface $book);

    /**
     * 创建电子书
     *
     * @param UserInterface $user 作者
     * @return BookInterface
     */
    public function createBook(UserInterface $user);

    /**
     * 保存电子书
     *
     * @param BookInterface $book
     */
    public function saveBook(BookInterface $book);

    /**
     * 给电子书添加章节
     *
     * @param BookInterface $book
     * @param ChapterInterface|string $chapter
     * @return ChapterInterface
     */
    public function addBookChapter(BookInterface $book, $chapter);

    /**
     * 获取用户的电子书数量
     *
     * @param UserInterface $user
     * @return int
     */
    public function getUserBookNumber(UserInterface $user);

    /**
     * 同级移动电子书章节
     *
     * @param BookInterface $book
     * @param ChapterInterface $chapter
     * @param string $direction
     * @param int|true $step
     */
    public function moveBookChapter(BookInterface $book, ChapterInterface $chapter, $direction, $step);
}