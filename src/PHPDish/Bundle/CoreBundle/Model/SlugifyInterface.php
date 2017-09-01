<?php
namespace PHPDish\Bundle\CoreBundle\Model;

interface SlugifyInterface
{
    /**
     * 获取slug
     * @return string
     */
    public function getSlug();
}