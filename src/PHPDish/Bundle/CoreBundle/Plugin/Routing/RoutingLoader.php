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

namespace PHPDish\Bundle\CoreBundle\Plugin\Routing;

use PHPDish\Bundle\CoreBundle\Plugin\PluginManager;
use Symfony\Component\Config\Loader\Loader;
use Symfony\Component\Routing\RouteCollection;

class RoutingLoader extends Loader
{
    /**
     * @var array
     */
    protected $routerResources;

    /**
     * {@inheritdoc}
     */
    public function load($resource, $type = null)
    {
        $routes = new RouteCollection();

        foreach ($this->routerResources as $resource) {
            $type = pathinfo($resource, PATHINFO_EXTENSION);
            if ($type === 'yml') {
                $type = 'yaml';
            }
            $importedRoutes = $this->import($resource, $type);
            $routes->addCollection($importedRoutes);
        }

        return $routes;
    }

    public function addResource($resource)
    {
        $this->routerResources[] = $resource;
    }

    /**
     * {@inheritdoc}
     */
    public function supports($resource, $type = null)
    {
        return $type === 'phpdish_plugin';
    }
}