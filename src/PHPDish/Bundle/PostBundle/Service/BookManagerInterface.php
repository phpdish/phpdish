<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\PostBundle\Model\BookInterface;
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

    public function addBookChapter(BookInterface $book, $chapter);
}