<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\AdminBundle\Grid\Twig;

use PHPDish\Bundle\AdminBundle\Grid\GridInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TemplateWrapper;

class GridExtension extends AbstractExtension
{
    /**
     * @var Environment
     */
    protected $twig;

    /**
     * @var string
     */
    protected $baseTemplate;

    /**
     * @var TemplateWrapper[]
     */
    protected $templates = [];

    public function __construct(Environment $twig, $baseTemplate)
    {
        $this->twig = $twig;
        $this->baseTemplate = $baseTemplate;
    }

    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('grid', [$this, 'grid'])
        ];
    }

    public function grid(GridInterface $grid, $theme =  null)
    {
        $this->initializeTemplate($theme);
    }

    /**
     * 是否有block
     *
     * @param string $name
     * @return bool
     */
    protected function hasBlock($name)
    {
        foreach ($this->templates as $template) {
            if ($template->hasBlock($name)) {
                return true;
            }
        }
        return false;
    }

    protected function initializeTemplate($theme)
    {
        if ($this->templates) {
            return;
        }
        if ($theme) {
            $themeTemplate = $this->twig->load($theme);
            $this->templates[] = $themeTemplate;
        }
        $this->templates[] = $this->twig->load($this->baseTemplate);
    }
}