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

namespace PHPDish\Bundle\CoreBundle\Application\Plugin\Finder;

class CachedPluginFinder implements PluginFinderInterface
{
    /**
     * @var PluginFinderInterface
     */
    protected $decoratedFinder;

    /**
     * @var array
     */
    protected $cache;

    /**
     * @var boolean
     */
    protected $cached;

    /**
     * @var array
     */
    protected $plugins;

    public function __construct($cacheFile, PluginFinderInterface $finder)
    {
        if (file_exists($cacheFile)) {
            $this->cached = true;
            $this->cache = include_once $cacheFile;
        } else {
            $this->cached = false;
        }
        $this->decoratedFinder = $finder;
    }

    /**
     * {@inheritdoc}
     */
    public function findAll()
    {
        if ($this->plugins) {
            return $this->plugins;
        }

        if ($this->cached) {
            foreach ($this->cache as $pluginItem) {
                $this->plugins[] = new $pluginItem['class'];
            }
        } else {
            $this->plugins = $this->decoratedFinder->findAll();
        }
        return $this->plugins;
    }
}