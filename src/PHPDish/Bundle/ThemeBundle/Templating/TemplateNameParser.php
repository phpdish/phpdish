<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\Templating;

use Symfony\Bundle\FrameworkBundle\Templating\TemplateReference;
use Symfony\Component\Templating\TemplateReferenceInterface;
use Symfony\Bundle\FrameworkBundle\Templating\TemplateNameParser as BaseTemplateNameParser;

/**
 * TemplateNameParser converts template names from the short notation
 * "@Bundle/Section/template.format.engine" to TemplateReferenceInterface instances.
 */
final class TemplateNameParser extends BaseTemplateNameParser
{

    /**
     * {@inheritdoc}
     */
    public function parse($name): TemplateReferenceInterface
    {
        if ($name instanceof TemplateReferenceInterface) {
            return $name;
        }

        if (isset($this->cache[$name])) {
            return $this->cache[$name];
        }

        //不符合twig别名模式的
        if (!preg_match('/^(?:@([^\/]*)|)(?:\/(.+))?\/(.+)\.([^\.]+)\.([^\.]+)$/', $name, $matches)) {
            return parent::parse($name);
        }

        $template = new TemplateReference(
            $matches[1] ? $matches[1] . 'Bundle' : '',
            $matches[2],
            $matches[3],
            $matches[4],
            $matches[5]
        );

        if ($template->get('bundle')) {
            try {
                $this->kernel->getBundle($template->get('bundle'));
            } catch (\Exception $e) {
                return parent::parse($name);
            }
        }

        return $this->cache[$name] = $template;
    }
}
