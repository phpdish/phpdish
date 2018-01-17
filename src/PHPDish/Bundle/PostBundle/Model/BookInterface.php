<?php

namespace PHPDish\Bundle\PostBundle\Model;

interface BookInterface
{
    /**
     * 获取书籍的目录
     * @return array
     */
    public function getSummary();
}