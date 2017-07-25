<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Pagerfanta\Pagerfanta;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

interface CategoryManagerInterface
{
    /**
     * 获取所有开启的分类
     * @return Pagerfanta
     */
    public function findAllEnabledCategories();

}