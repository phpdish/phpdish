<?php

namespace PHPDish\Bundle\CoreBundle\Twig;

use Symfony\Component\HttpFoundation\RequestStack;

class UrlPatternExtension extends \Twig_Extension
{
    protected $request;

    public function __construct(RequestStack $requestStack)
    {
        $this->request = $requestStack->getCurrentRequest();
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('is_route_matched', [$this, 'isRouteMatched']),
            new \Twig_SimpleFunction('is_url_pattern_matched', [$this, 'isUrlPatternMatched']),
        ];
    }

    /**
     * 当前匹配的是否是指定路由.
     *
     * @param string $routeName
     *
     * @return bool
     */
    public function isRouteMatched($routeName)
    {
        return $this->request->attributes->get('_route') === $routeName;
    }

    /**
     * 检查当前路由是否匹配正则.
     *
     * @param string $pattern
     *
     * @return bool
     */
    public function isUrlPatternMatched($pattern)
    {
        return (bool) preg_match("#{$pattern}#i", $this->request->getPathInfo());
    }
}
