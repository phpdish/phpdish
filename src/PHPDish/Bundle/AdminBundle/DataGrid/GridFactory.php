<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\DataGrid;

use APY\DataGridBundle\Grid\Grid;
use APY\DataGridBundle\Grid\Source\Entity;
use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\ResourceBundle\Metadata\ResourceRegistry;
use Symfony\Component\HttpFoundation\RequestStack;

class GridFactory
{
    /**
     * @var ResourceRegistry
     */
    protected $resourceRegistry;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var RequestStack
     */
    protected $requestStack;

    /**
     * [
     *     'PHPDish\Bundle\UserBundle\UserInterface' => 'phpdish_admin.source_factory.user'
     * ]
     * @var GridFactoryInterface[]
     */
    protected $factory = [];

    /**
     * @var Grid
     */
    protected $grid;

    public function __construct(
        ResourceRegistry $resourceRegistry,
        EntityManagerInterface $entityManager,
        RequestStack $requestStack,
        Grid $grid
    ) {
        $this->resourceRegistry = $resourceRegistry;
        $this->entityManager = $entityManager;
        $this->requestStack = $requestStack;
        $this->grid = $grid;
    }

    /**
     * 获取grid source
     *
     * @param string $sourceClass
     * @return Grid
     * @throws \ReflectionException
     */
    public function get($sourceClass)
    {
        if (isset($this->factory[$sourceClass])) {
            $factory = $this->factory[$sourceClass];
            $grid = $factory->factory();
        } else {
            $reflection = new \ReflectionClass($sourceClass);
            if (!$reflection->isInstantiable()) {
                throw new \InvalidArgumentException(sprintf('The "%s" cannot be instantiated'));
            }
            $source = new Entity($sourceClass);
            $this->grid->setSource($source);
            $grid = $this->grid;
        }
        //handle request
        $grid->handleRequest($this->requestStack->getCurrentRequest());
//        dump($grid->getColumns());
        return $grid;
    }

    public function addFactory($sourceClass, $factory)
    {
        $this->factory[$sourceClass] = $factory;
    }
}