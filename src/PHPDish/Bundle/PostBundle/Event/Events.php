<?php

namespace PHPDish\Bundle\PostBundle\Event;

final class Events
{
    /**
     * 保存文章之前处触发.
     *
     * @var string
     */
    const POST_PRE_PERSIST = 'post.pre_persist';

    /**
     * 文章被评论之后触发.
     *
     * @var string
     */
    const POST_COMMENTED = 'post.commented';

    /**
     * 评论中提及用户.
     *
     * @var string
     */
    const USER_MENTIONED_COMMENT = 'user.mentioned.comment';

    /**
     * 专栏被订阅.
     *
     * @var string
     */
    const CATEGORY_FOLLOWED = 'category.followed';

    /**
     * 专栏被创建之前
     * @var string
     */
    const CATEGORY_PRE_CREATED = 'category.pre_created';

    /**
     * 专栏保存时创建
     * @var string
     */
    const CATEGORY_PRE_PERSIST = 'category.pre_persist';

    /**
     * 文章被点赞时触发
     * @var string
     */
    const POST_VOTED = 'post.voted';

    /**
     * 评论被点赞时触发
     * @var string
     */
    const COMMENT_VOTED = 'comment.voted';
}
