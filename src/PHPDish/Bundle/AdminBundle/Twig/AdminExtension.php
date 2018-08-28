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

use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AdminExtension extends AbstractExtension
{
    /**
     * @var Environment
     */
    protected $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('breadcrumb', [$this, 'renderBreadcrumb'])
        ];
    }

    public function renderBreadcrumb(Breadcrumb $breadcrumb)
    {
        $breadcrumb->unshift('admin.homepage', 'admin_homepage');
        return $this->twig->render('PHPDishAdminBundle:Common:_breadcrumbs.html.twig', [
            'breadcrumb' => $breadcrumb
        ]);
    }
}