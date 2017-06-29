<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Comment;

use PHPDish\Component\Comment\Entity\CommentableInterface;
use PHPDish\Component\Comment\Entity\CommentInterface;
use PHPDish\Component\Comment\Table\CommentsTable;
use PHPDish\Component\User\UserInterface;

class CommentManager
{
    /**
     * @var CommentsTable
     */
    protected $comments;

    /**
     * 创建一个评论或回复
     * @return CommentInterface
     */
    public function create(CommentableInterface $commentable, UserInterface $user, $content)
    {
        $comment = $this->comments->newEntity([
            'content' => $content
        ]);
        $comment->setCommentable($commentable);
        $comment->setUser($user);
        return $this->comments->save($comment);
    }
}