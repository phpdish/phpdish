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

use APY\DataGridBundle\Twig\DataGridExtension as BaseDataGridExtension;
use Twig_Environment;

class DataGridExtension extends BaseDataGridExtension
{
    /**
     * 覆盖父级方法
     *
     * @param Twig_Environment $environment
     * @return \Twig_Template[]
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    protected function getTemplates(Twig_Environment $environment)
    {
        if ($this->templates) {
            return $this->templates;
        }
        $this->templates[] = $environment->load($this->defaultTemplate);
        if ($this->theme) {
            if (!$this->theme instanceof \Twig_Template && !$this->theme instanceof \Twig_TemplateWrapper) {
                $template = $environment->load($this->theme);
            } else {
                $template = $this->theme;
            }
            $this->templates[] = $template;
        }
        return $this->templates;
    }
}