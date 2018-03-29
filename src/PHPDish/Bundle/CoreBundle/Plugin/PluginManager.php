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

namespace PHPDish\Bundle\CoreBundle\Plugin;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class PluginManager
{
    /**
     * @var SimplePlugin[]|Collection
     */
    protected $plugins;

    /**
     * @var string
     */
    protected $installedJson;

    public function __construct()
    {
        $this->plugins = new ArrayCollection();
    }

    /**
     * Scan all simple plugins
     *
     * @return $this
     */
    public function scanPlugins()
    {
        if ($this->plugins || !file_exists($this->installedJson)) {
            return $this;
        }
        $installed = \GuzzleHttp\json_decode(file_get_contents($this->installedJson), true);
        foreach ($installed as $package) {
            if (
                !isset($package['type'])
                || $package['type'] === 'phpdish-plugin'
                || !isset($package['extra']['phpdish']['class'])
            ) {
                continue;
            }
            $pluginClass = $package['extra']['phpdish']['class'];
            $this->plugins[] = $this->initializePlugin($pluginClass);
        }
        return $this;
    }

    /**
     * Gets all plugins
     * @return Collection|SimplePlugin[]
     */
    public function getPlugins()
    {
        return $this->plugins;
    }

    protected function initializePlugin($pluginClass)
    {
        return new $pluginClass;
    }
}