<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Twig;

final class Breadcrumb
{
    /**
     * @var array
     */
    protected $crumbs = [];

    /**
     * 添加一个新选项
     *
     * @param string $title
     * @param string $route
     * @param array $routeParameters
     */
    public function push($title, $route = null, $routeParameters = [])
    {
        $this->crumbs[] = [
            'title' => $title,
            'route' => $route,
            'routeParameters' => $routeParameters
        ];
    }

    /**
     * 追加一个新选项
     *
     * @param string $title
     * @param string $route
     * @param array $routeParameters
     */
    public function unshift($title, $route = null, $routeParameters = [])
    {
        array_unshift($this->crumbs, [
            'title' => $title,
            'route' => $route,
            'routeParameters' => $routeParameters
        ]);
    }

    /**
     * 选项数
     *
     * @return int
     */
    public function count()
    {
        return count($this->crumbs);
    }

    /**
     * 移除指定选项
     *
     * @param string $title
     */
    public function remove($title)
    {
        $this->crumbs = array_filter($this->crumbs, function($crumb) use ($title){
            return $crumb['title'] !== $title;
        });
    }

    public function all()
    {
        return $this->crumbs;
    }
}