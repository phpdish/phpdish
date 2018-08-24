<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class ThemePass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        //覆盖目标版定位器
        $container->setAlias('templating.locator', 'phpdish_theme.templating_locator');
        //覆盖文件路径缓存预热器
        $container->setAlias('templating.cache_warmer.template_paths', 'phpdish_theme.templating.cache_warmer.template_paths');
        //覆盖twig的loader
        $container->setAlias('twig.loader.filesystem', 'phpdish_theme.twig.loader.filesystem');
    }
}