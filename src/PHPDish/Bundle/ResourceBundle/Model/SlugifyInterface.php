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

interface SlugifyInterface
{
    /**
     * 获取slug.
     *
     * @return string
     */
    public function getSlug();

    /**
     * 设置slug
     *
     * @param string $slug
     * @return self
     */
    public function setSlug($slug);
}
