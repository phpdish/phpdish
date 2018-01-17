<?php

namespace PHPDish\Bundle\PostBundle\Service;

use PHPDish\Bundle\PostBundle\Model\BookInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;

interface BookManagerInterface
{
    /**
     * 获取图书
     * @param string $slug
     * @return BookInterface
     */
    public function findBook($slug);

    /**
     * 获取章节
     * @param int $id
     * @return PostInterface
     */
    public function findCharacter($id);
}