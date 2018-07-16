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

    protected $baseUrl;

    public function __construct(ContainerInterface $container, $baseUrl)
    {
        $this->container = $container;
        $this->baseUrl = $baseUrl;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('media_url_build', [$this, 'buildMediaUrl']),
            new \Twig_SimpleFilter('image_process', [$this, 'processBodyImage']),
        ];
    }

    /**
     * 处理内容中的图片地址
     *
     * @param string $body
     * @return string
     */
    public function processBodyImage($body)
    {
        return preg_replace_callback('#<img src="(.*)"#', function($matches){
            if (strpos('http', $matches[1]) === 0) {
                return $matches[0];
            }
            return str_replace($matches[1], $this->baseUrl . $matches[1], $matches[0]);
        }, $body);
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