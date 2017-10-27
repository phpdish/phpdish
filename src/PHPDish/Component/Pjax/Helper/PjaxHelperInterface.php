<?php

namespace PHPDish\Component\Pjax\Helper;

use Symfony\Component\HttpFoundation\Request;

interface PjaxHelperInterface
{
    /**
     * 判断是否是pjax请求
     *
     * @param Request $request
     * @return boolean
     */
    public function isPjaxRequest(Request $request);

    /**
     * 获取container
     *
     * @param Request $request
     * @return string
     */
    public function getContainer(Request $request);
}