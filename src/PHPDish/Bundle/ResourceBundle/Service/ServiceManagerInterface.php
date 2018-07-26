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

interface ServiceManagerInterface
{
    /**
     * @return string
     */
    public function getEntityClass();

    /**
     * @param string $class
     */
    public function setEntityClass($class);
}