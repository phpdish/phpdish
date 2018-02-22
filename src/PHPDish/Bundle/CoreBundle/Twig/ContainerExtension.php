<?php

namespace PHPDish\Bundle\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ContainerExtension extends \Twig_Extension implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('read_config_parameter', [$this, 'getConfigurationParameter'])
        ];
    }

    /**
     * 获取配置参数
     * @param string $key
     * @return mixed
     */
    public function getConfigurationParameter($key)
    {
        return $this->container->getParameter($key);
    }
}