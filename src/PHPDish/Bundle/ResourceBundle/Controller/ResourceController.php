<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceConfigurationInterface;

class ResourceController extends FOSRestController
{
    const HTTP_BAD_REQUEST = 400;
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;

    /**
     * @var ResourceConfigurationInterface
     */
    protected $configuration;

    public function __construct(ResourceConfigurationInterface $configuration)
    {
        $this->configuration = $configuration;
    }
}
