<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Model;

use DateTime;

interface DateTimeInterface
{
    /**
     * 设置创建时间.
     *
     * @param DateTime $createdAt
     *
     * @return $this
     */
    public function setCreatedAt(DateTime $createdAt);

    /**
     * 获取创建时间.
     *
     * @return DateTime
     */
    public function getCreatedAt();

    /**
     * 设置更新时间.
     *
     * @param DateTime $updatedAt
     *
     * @return $this
     */
    public function setUpdatedAt(DateTime $updatedAt);

    /**
     * 获取更新时间.
     *
     * @return DateTime
     */
    public function getUpdatedAt();
}
