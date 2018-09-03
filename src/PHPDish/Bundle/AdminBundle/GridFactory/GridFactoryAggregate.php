<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\GridFactory;

use PHPDish\Bundle\AdminBundle\Grid\Factory;
use PHPDish\Bundle\AdminBundle\Grid\GridInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class GridFactoryAggregate
{
    /**
     * [
     *     'PHPDish\Bundle\UserBundle\UserInterface' => 'phpdish_admin.source_factory.user'
     * ]
     * @var GridFactoryInterface[]
     */
    protected $factories = [];

    /**
     * @var Factory
     */
    protected $factory;

    /**
     * @var RequestStack
     */
    protected $requestStack;

    public function __construct(
        Factory $factory,
        RequestStack $requestStack
    ){
        $this->factory = $factory;
        $this->requestStack = $requestStack;
    }

    /**
     * 获取grid source
     *
     * @param string $sourceClass
     * @return GridInterface
     * @throws \ReflectionException
     */
    public function get($sourceClass)
    {
        if (isset($this->factories[$sourceClass])) {
            $factory = $this->factory[$sourceClass];
            $grid = $factory->getGrid();
        } else {
            $reflection = new \ReflectionClass($sourceClass);
            if (!$reflection->isInstantiable()) {
                throw new \InvalidArgumentException(sprintf('The "%s" cannot be instantiated'));
            }
            $grid = $this->factory->createGrid($sourceClass);
        }
        //handle request
        $grid->handleRequest($this->requestStack->getCurrentRequest());
        return $grid;
    }

    public function addFactory($sourceClass, $factory)
    {
        $this->factories[$sourceClass] = $factory;
    }
}