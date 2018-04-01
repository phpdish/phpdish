<?php

/*
 * This file is part of the phpdish/plugin-installer package.
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PHPDish\PluginInstaller;

use Composer\Composer;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;
use Composer\Util\Filesystem;

class PluginInstaller implements PluginInterface
{
    /**
     * @var string
     */
    const PLUGIN_PATH = 'plugins';

    /**
     * {@inheritdoc}
     */
    public function activate(Composer $composer, IOInterface $io)
    {
        (new Filesystem())->ensureDirectoryExists(static::PLUGIN_PATH);

        $repository = new ProxyRepository(static::PLUGIN_PATH, 2, $io, $composer->getConfig());
        $composer->getRepositoryManager()->addRepository($repository);
    }
}