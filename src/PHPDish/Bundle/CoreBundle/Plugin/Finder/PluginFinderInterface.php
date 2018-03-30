<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Plugin\Finder;

use PHPDish\Bundle\CoreBundle\Plugin\SimplePlugin;

interface PluginFinderInterface
{
    /**
     * 获取所有插件
     *
     * @return SimplePlugin[]
     */
    public function findAll();
}