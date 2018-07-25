<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Controller;


interface ResourceConfigurationInterface
{
    /**
     * 获取模板
     *
     * @param string $key
     * @return string
     */
    public function getTemplate($key);
}