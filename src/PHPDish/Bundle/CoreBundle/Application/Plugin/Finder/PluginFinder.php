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

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\CoreBundle\Application\Plugin\SimplePluginInterface;

class PluginFinder implements PluginFinderInterface
{
    /**
     * @var SimplePluginInterface[]|Collection
     */
    protected $plugins;

    /**
     * @var string
     */
    protected $installedJson;

    public function __construct($projectDir)
    {
        $this->installedJson = $projectDir . '/vendor/composer/installed.json';

        $this->plugins = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function findAll()
    {
        if (!file_exists($this->installedJson)) {
            return [];
        }
        $installed = \GuzzleHttp\json_decode(file_get_contents($this->installedJson), true);
        foreach ($installed as $package) {
            if (
                !isset($package['type'])
                || $package['type'] !== 'phpdish-plugin'
                || !isset($package['extra']['phpdish']['class'])
            ) {
                continue;
            }
            $pluginClass = $package['extra']['phpdish']['class'];
            $this->plugins[] = $this->initializePlugin($pluginClass);
        }
        return $this->plugins;
    }

    protected function initializePlugin($pluginClass)
    {
        return new $pluginClass;
    }
}