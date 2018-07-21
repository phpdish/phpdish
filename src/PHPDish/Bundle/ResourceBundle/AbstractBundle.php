<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle;

use Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

abstract class AbstractBundle extends Bundle
{
    /**
     * @var string
     */
    protected $modelNamespace;

    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(DoctrineOrmMappingsPass::createYamlMappingDriver(
            [$this->getConfigFilesPath() => $this->getModelNamespace()],
            [sprintf('%s.object_manager', $this->getBundlePrefix())]
        ));
    }

    /**
     * 获取实体命名空间
     * @return string
     */
    protected function getModelNamespace()
    {
        if ($this->modelNamespace) {
            return $this->modelNamespace;
        }
        return $this->modelNamespace = __NAMESPACE__ . '\Model';
    }

    /**
     * 获取bundle前缀
     *
     * @return string
     */
    protected function getBundlePrefix(): string
    {
        return Container::underscore(substr(strrchr(get_class($this), '\\'), 1, -6));
    }

    /**
     * @return string
     */
    protected function getConfigFilesPath(): string
    {
        return sprintf('%s/Resources/config/%s',
            $this->getPath(),
            $this->getDoctrineMappingDirectory()
        );
    }

    /**
     * @return string
     */
    protected function getDoctrineMappingDirectory(): string
    {
        return  'doctrine-mapping';
    }
}