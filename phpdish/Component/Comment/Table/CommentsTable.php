<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Component\Comment\Table;

use Cake\ORM\Table;
use PHPDish\Component\Comment\Repistory\CommentRepositoryInterface;

class CommentsTable extends Table implements CommentRepositoryInterface
{
    public function initialize(array $config)
    {
        $this->setTable('comments');
    }
}