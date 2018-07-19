<?php

namespace PHPDish\Bundle\PostBundle\Model;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface BookInterface extends CategoryInterface
{
    /**
     * 获取电子书的目录
     * @return Collection|ChapterInterface[]
     */
    public function getSummary();

    /**
     * 获取作者
     * @return UserInterface
     */
    public function getAuthor();
}