<?php
/**
 * PHPDish post bundle
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\Post;

use PHPDish\Bundle\BundleInterface;
use Slince\Di\Container;

class PostBundle implements BundleInterface
{
    public function getName()
    {
        return 'phpdish.post';
    }

    public function registerServices(Container $container)
    {
    }
}