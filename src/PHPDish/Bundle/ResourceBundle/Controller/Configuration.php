<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Controller;

class Configuration
{
    /**
     * @var array
     */
    protected $resource;

    protected $templates;

    protected $defaultTemplateNamespace;

    public function __construct($resource, $templates)
    {
        $this->resource = $resource;
        $this->templates = $templates;
    }

    /**
     * @param string $key
     * @return string
     */
    public function getTemplate($key)
    {
        if (isset($this->templates[$key])) {
            return $this->templates[$key];
        }
        return $this->defaultTemplateNamespace . '/' . $key;
    }

    /**
     * 设置默认空间
     *
     * @param string $defaultTemplateNamespace
     */
    public function setDefaultTemplateNamespace($defaultTemplateNamespace)
    {
        $this->defaultTemplateNamespace = $defaultTemplateNamespace;
    }
}