<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Plugin\Cache;

use Symfony\Component\HttpKernel\CacheClearer\CacheClearerInterface;

class PluginPathsCacheClearer implements CacheClearerInterface
{
    /**
     * {@inheritdoc}
     */
    public function clear($cacheDir)
    {
        @unlink($cacheDir . '/phpdish_plugins.php');
    }
}