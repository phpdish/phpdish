<?php

namespace PHPDish\Component\Resource\Model;

use Doctrine\Common\Collections\Collection;

trait TreeTrait
{
    private $left;

    private $level;

    private $right;

    private $root;

    /**
     * 子章节
     */
    protected $children;

    /**
     * 父章节
     */
    protected $parent;

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

    /**
     *  获取父节点
     *
     * @return TreeInterface
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     *  设置父节点
     */
    public function setParent($chapter)
    {
        $this->parent = $chapter;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoot()
    {
        return $this->root;
    }

    /**
     * 获取子节点
     *
     * @return TreeInterface[]|Collection
     */
    public function getChildren()
    {
        return $this->children;
    }
}