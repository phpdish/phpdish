<?php
namespace PHPDish\Bundle\PostBundle\Event;

final class Events
{
    /**
     * 保存文章之前处触发
     * @var string
     */
    const POST_PRE_PERSIST = 'phpdish.post.pre_persist';
}