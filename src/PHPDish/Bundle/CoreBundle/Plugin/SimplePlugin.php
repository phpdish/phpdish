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

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

abstract class SimplePlugin
{
    /**
     * @var string
     */
    protected $rootDir;

    /**
     * Register Events
     * @param EventDispatcherInterface $eventDispatcher
     */
    public function registerEvents(EventDispatcherInterface $eventDispatcher)
    {

    }

    public function registerServices(ContainerBuilder $container)
    {
    }

    public function registerServiceFiles()
    {
        $defaultServiceFile = $this->getRootDir() . '/services.yml';
        if (file_exists($defaultServiceFile)) {
            return [$defaultServiceFile];
        }
        return [];
    }

    public function getRootDir()
    {
        if ($this->rootDir === null) {
            $reflection = new \ReflectionObject($this);
            $this->rootDir = dirname($reflection->getFileName());
        }
        return $this->rootDir;
    }
}