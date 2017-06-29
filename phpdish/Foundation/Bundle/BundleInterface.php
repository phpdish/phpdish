<?php
/**
 * PHPDish bundle library
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Foundation\Bundle;

use Slince\Di\Container;

interface BundleInterface
{
    public function getName();

    public function registerServices(Container $container);

    public function getConfig();
}