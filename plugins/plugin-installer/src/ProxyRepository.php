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

use Composer\Config;
use Composer\IO\IOInterface;
use Composer\Package\Loader\ArrayLoader;
use Composer\Repository\ArrayRepository;
use Composer\Repository\PathRepository;
use Symfony\Component\Finder\Finder;

class ProxyRepository extends ArrayRepository
{
    /**
     * @var ArrayLoader
     */
    protected $loader;

    protected $dir;

    protected $depth;

    protected $io;

    protected $config;

    public function __construct($dir, $depth, IOInterface $io, Config $config)
    {
        $this->dir = $dir;
        $this->depth = $depth;
        $this->io = $io;
        $this->config = $config;
        parent::__construct();
    }

    /**
     * {@inheritdoc}
     */
    public function initialize()
    {
        parent::initialize();

        $foundFiles = (new Finder())->in($this->dir)->depth("<={$this->depth}")->name('composer.json')
            ->contains('/"type"\s*:\s*"phpdish-plugin"/');

        foreach ($foundFiles as $file) {
            $pathRepository = new PathRepository([
                'type' => 'path',
                'url' => $file->getPath(),
            ], $this->io, $this->config);

            foreach ($pathRepository->getPackages() as $package) {
                $reflection = new \ReflectionObject($package);
                $property = $reflection->getProperty('repository');
                $property->setAccessible(true);
                $property->setValue($package, $this);
                $this->addPackage($package);
            }
            unset($pathRepository);
            $pathRepository = null;
        }
    }
}