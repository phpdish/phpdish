<?php
namespace PHPDish\Bundle\PostBundle\Event;

final class Events
{
    /**
     * 保存文章之前处触发
     * @var string
     */
    const POST_PRE_PERSIST = 'post.pre_persist';

    /**
     * 文章被评论之后触发
     * @var string
     */
    const POST_COMMENTED = 'post.commented';

    /**
     * 评论中提及用户
     * @var string
     */
    const USER_MENTIONED_COMMENT = 'user.mentioned.comment';

    /**
     * 专栏被订阅
     * @var string
     */
    const CATEGORY_FOLLOWED = 'category.followed';
}