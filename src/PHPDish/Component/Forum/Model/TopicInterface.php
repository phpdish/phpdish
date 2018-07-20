<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Forum\Model;

use PHPDish\Component\Cms\Model\PostInterface;
use PHPDish\Component\Resource\Model\IdentifiableInterface;

interface TopicInterface extends
    IdentifiableInterface, PostInterface
{
    /**
     * 获取所属thread.
     *
     * @return ThreadInterface[]
     */
    public function getThreads();

    /**
     * @param ThreadInterface[] $threads
     *
     * @return $this
     */
    public function setThreads($threads);

    /**
     * 是否推荐.
     *
     * @return bool
     */
    public function isRecommended();

    /**
     * 设置推荐.
     *
     * @param bool $recommended
     *
     * @return $this
     */
    public function setRecommended($recommended);

    /**
     * 推荐话题.
     *
     * @return $this
     */
    public function recommend();

    /**
     * 设置置顶.
     *
     * @param bool $isTop
     *
     * @return $this
     */
    public function setTop($isTop);

    /**
     * 置顶话题.
     *
     * @return $this
     */
    public function stickTop();

    /**
     * 是否是置顶话题
     *
     * @return boolean
     */
    public function isTop();
}
