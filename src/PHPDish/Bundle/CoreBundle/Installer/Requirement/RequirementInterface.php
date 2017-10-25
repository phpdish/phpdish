<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Requirement;

interface RequirementInterface
{
    /**
     * 获取标签
     *
     * @return string
     */
    public function getLabel();

    /**
     * 要求是否被满足
     *
     * @return boolean
     */
    public function isFulfilled();

    /**
     * 是否是必须的
     * @return boolean
     */
    public function isRequired();
}