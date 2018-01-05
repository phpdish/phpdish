<?php

namespace PHPDish\Bundle\MediaBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;

class MediaExtension extends \Twig_Extension
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('media_url_build', [$this, 'buildMediaUrl'])
        ];
    }

    /**
     * 构建媒体资源的访问链接
     * @param string $key
     * @param string $alias
     * @return string
     */
    public function buildMediaUrl($key, $alias = null)
    {
        $serviceId = $alias ? 'phpdish.media.url_builder.' .  $alias : 'phpdish.media.url_builder';
        try {
            $urlBuilder = $this->container->get($serviceId);
        } catch (ServiceNotFoundException $exception) {
            throw new \InvalidArgumentException(sprintf('Invalid Media Service Alias "%s"', $alias));
        }
        return $urlBuilder->build($key);
    }
}