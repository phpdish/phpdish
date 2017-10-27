<?php

namespace PHPDish\Component\Pjax\Helper;


use Symfony\Component\HttpFoundation\Request;

final class PjaxHelper implements PjaxHelperInterface
{
    /**
     * {@inheritdoc}
     */
    public function isPjaxRequest(Request $request)
    {
        return (bool)$request->headers->get('X-PJAX', false);
    }

    /**
     * {@inheritdoc}
     */
    public function getContainer(Request $request)
    {
        return $request->headers->get('X-PJAX-Container');
    }
}