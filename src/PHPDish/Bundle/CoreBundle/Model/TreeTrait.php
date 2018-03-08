<?php

namespace PHPDish\Bundle\CoreBundle\Model;

use Gedmo\Mapping\Annotation as Gedmo;

trait TreeTrait
{
    /**
     * @Gedmo\TreeLeft
     */
    private $left;

    /**
     * @Gedmo\TreeLevel
     */
    private $level;

    /**
     * @Gedmo\TreeRight
     */
    private $right;


    /**
     * 获取当前节点层级
     *
     * @return int
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * 获取节点左边数据
     * @return int
     */
    public function getLeft()
    {
        return $this->left;
    }

    /**
     * 获取节点右边数据
     * @return int
     */
    public function getRight()
    {
        return $this->right;
    }
}