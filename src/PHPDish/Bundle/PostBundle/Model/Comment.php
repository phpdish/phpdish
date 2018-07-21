<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace  PHPDish\Bundle\PostBundle\Model;


use PHPDish\Bundle\CmsBundle\Model\AbstractComment;
use PHPDish\Bundle\CmsBundle\Model\VotableTrait;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class Comment extends AbstractComment implements CommentInterface
{
    use IdentifiableTrait, VotableTrait;

    /**
     * @var PostInterface
     */
    protected $post;

    /**
     * {@inheritdoc}
     */
    public function setPost(PostInterface $post)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPost()
    {
        return $this->post;
    }
}
