<?php

namespace PHPDish\Bundle\PostBundle\Model;

interface ChapterInterface
{
    /**
     * 获取上一级章节
     *
     * @return ChapterInterface|null
     */
    public function getParent();

    /**
     * 获取子章节
     * @return ChapterInterface[]
     */
    public function getChildren();

    /**
     * 设置上一级别章节
     *
     * @param ChapterInterface $chapter
     * @return ChapterInterface
     */
    public function setParent(ChapterInterface $chapter);
//    /**
//     * 获取上一章
//     * @return ChapterInterface|null
//     */
//    public function getPrev();
//
//    /**
//     * 获取下一章
//     * @return ChapterInterface|null
//     */
//    public function getNext();
}