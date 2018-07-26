<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Service;

class ServiceManager
{
    protected $entityClass;

    public function setEntityClass($class)
    {
        $this->entityClass = $class;
    }

    public function getEntityClass()
    {
        return $this->entityClass;
    }
}