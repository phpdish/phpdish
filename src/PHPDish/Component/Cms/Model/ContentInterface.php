<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\Cms\Model;

interface ContentInterface
{
    /**
     * 获取格式化之后的body.
     *
     * @return string
     */
    public function getBody();

    /**
     * 设置body.
     *
     * @param string $body
     *
     * @return string
     */
    public function setBody($body);

    /**
     * 获取原始的body(markdown).
     *
     * @return string
     */
    public function getOriginalBody();

    /**
     * 设置original body.
     *
     * @param string $body
     *
     * @return $this
     */
    public function setOriginalBody($body);
}
