<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Checker;


interface CheckInterface
{
    /**
     * 检查环境
     *
     * @return boolean
     */
    public function check();
}