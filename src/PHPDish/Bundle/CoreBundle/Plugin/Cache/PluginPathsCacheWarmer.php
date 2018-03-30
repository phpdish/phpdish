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

namespace PHPDish\Bundle\CoreBundle\Plugin\Cache;

use PHPDish\Bundle\CoreBundle\Plugin\Finder\PluginFinderInterface;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmer;

class PluginPathsCacheWarmer extends CacheWarmer
{
    /**
     * @var PluginFinderInterface
     */
    protected $pluginFinder;

    public function __construct(PluginFinderInterface $pluginFinder)
    {
        $this->pluginFinder = $pluginFinder;
    }

    /**
     * {@inheritdoc}
     */
    public function warmUp($cacheDir)
    {
        $plugins = $this->pluginFinder->findAll();
        $processed = [];
        foreach ($plugins as $plugin) {
            $processed[] = [
                'class' => get_class($plugin),
                'path' => $plugin->getRootDir()
            ];
        }
        $var = var_export($processed, true);
        $export = <<<EOT
<?php
return $var;
EOT;

        $this->writeCacheFile($cacheDir . '/phpdish_plugins.php', $export);
    }

    /**
     * {@inheritdoc}
     */
    public function isOptional()
    {
        return true;
    }
}