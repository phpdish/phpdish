<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Metadata;

class ResourceRegistry
{
    /**
     * [
     *     'phpdish_user' => [
     *         'user' => [
     *               'interface' => '',
     *               'model' => ''
     *         ]
     *     ]
     * ]
     * @var array
     */
    protected $resources;

    public function __construct($resources = [])
    {
        $this->resources = $resources;
    }

    /**
     * 合并资源
     *
     * @param string $alias
     * @param array $resources
     */
    public function mergeResources($alias, $resources)
    {
        $this->resources = array_merge($this->resources, [$alias => $resources]);
    }

    /**
     * 获取接口和实现的映射
     *
     * @return array
     */
    public function getInterfacesMapping()
    {
        $interfaces = [];
        foreach ($this->resources as $alias => $resource) {
            foreach ($resource as $resourceItem) {
                $interfaces[$resourceItem['interface']] = $resourceItem['model'];
            }
        }
        return $interfaces;
    }

    /**
     * 根据model查找
     * @param string $model
     * @return array|null
     */
    public function getResourceItemByModel($model)
    {
        $item = [];
        foreach ($this->resources as $alias => $resource) {
            foreach ($resource as $resourceItem) {
                if ($resourceItem['model'] === $model) {
                    return $resource;
                }
            }
        }
        return null;
    }
}