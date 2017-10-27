<?php
namespace PHPDish\Component\Pjax\Twig;

use PHPDish\Component\Pjax\Helper\PjaxHelperInterface;

class PjaxExtension extends \Twig_Extension
{
    /**
     * @var PjaxHelperInterface
     */
    protected $pjaxHelper;

    public function __construct(PjaxHelperInterface $pjaxHelper)
    {
        $this->pjaxHelper = $pjaxHelper;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('is_pjax_request', [$this->pjaxHelper, 'isPjaxRequest']),
        ];
    }
}